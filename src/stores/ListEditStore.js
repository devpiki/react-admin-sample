import {action, observable, makeObservable, computed} from 'mobx';
import React from "react";

function createData(seq, name, code, population, size, useyn) {
    return { seq, name, code, population, size, useyn };
}

/*seq값이 PK*/
let rows = [
    createData(1,'India', 'IN', 1324171354, 3287263, 'Y'),
    createData(2,'China', 'CN', 1403500365, 9596961, 'N'),
    createData(3,'Italy', 'IT', 60483973, 301340, 'Y'),
    createData(4,'United States', 'US', 327167434, 9833520, 'Y'),
    createData(5,'Canada', 'CA', 37602103, 9984670, 'Y'),
    createData(6,'Australia', 'AU', 25475400, 7692024, 'N'),
    createData(7,'Germany', 'DE', 83019200, 357578, 'Y'),
    createData(8,'Ireland', 'IE', 4857000, 70273, 'Y'),
    createData(9,'Mexico', 'MX', 126577691, 1972550, 'N'),
    createData(10,'Japan', 'JP', 126317000, 377973, 'Y'),
    createData(11,'France', 'FR', 67022000, 640679, 'Y'),
    createData(12,'United Kingdom', 'GB', 67545757, 242495, 'N'),
    createData(13,'Russia', 'RU', 146793744, 17098246, 'Y'),
    createData(14,'Nigeria', 'NG', 200962417, 923768, 'Y'),
    createData(15,'Brazil', 'BR', 210147125, 8515767, 'Y'),
    createData(16,'India2', 'IN2', 1324171354, 3287263, 'Y'),
    createData(17,'China2', 'CN2', 1403500365, 9596961, 'N'),
    createData(18,'Italy2', 'IT2', 60483973, 301340, 'Y'),
    createData(19,'United States2', 'US2', 327167434, 9833520, 'Y'),
    createData(20,'Canada2', 'CA2', 37602103, 9984670, 'N'),
    createData(21,'Australia2', 'AU2', 25475400, 7692024, 'Y'),
    createData(22,'Germany2', 'DE2', 83019200, 357578, 'Y'),
    createData(23,'Ireland2', 'IE2', 4857000, 70273, 'N'),
    createData(24,'Mexico2', 'MX2', 126577691, 1972550, 'Y'),
    createData(25,'Japan2', 'JP2', 126317000, 377973, 'N'),
];

export default class ListEditStore {
    @observable list = [];
    @observable count = 0;
    @observable searchList = [];
    @observable searchValue = 'ALL';

    constructor() {
        makeObservable(this);
    }

    @action setSearchValue = (s) => {this.searchValue = s;}

    @action setList = (list, cnt) => {this.list = list;this.count = cnt;}

    @action setSearchList(){
        let lst = rows.map(e=>{
            let row = {...e};
            return row.code[0];
        });
        lst = [...new Set(lst)].sort();
        lst.unshift('ALL');
        this.searchList = lst;
        if(lst.join('|').indexOf(this.searchValue) === -1){
            this.setSearchValue('ALL');
        }
    }

    @action selectList(){
        let result = [...rows];
        if(this.searchValue !== 'ALL'){
            result = rows.filter((item) => {
                return item.code[0] === this.searchValue;
            });
        }
        this.setList(result, result.length);
    }

    @action deleteObj(selectRowList){
        let that = this;
        return new Promise(function(resolve, reject){
            for(let i=(rows.length-1); i>=0 ; i--){
                for(let j=0; j<selectRowList.length ; j++){
                    if(selectRowList[j].seq === rows[i].seq){
                        rows.splice(i, 1);
                        break;
                    }
                }
            }
            that.setSearchList();
            resolve();
        });
    }

    @computed get getList() {
        return this.list.map((obj)=>{
            if(obj['population'] && obj['size']){
                obj['density'] = (obj['population'] / obj['size']).toFixed(3);
            }else{
                obj['density'] = 0;
            }
            return obj;
        });
    }

    @action doAdd(){
        const that = this;
        return new Promise(function(resolve, reject){
            const r = Math.floor(Math.random()*10000000000);
            const row = {seq:r, status:'insert'};
            that.setList([...that.list, row], that.count+1);
            resolve(row);
        });

    }

    @action doUpdate(selectRowList){
        this.list = this.list.map((row)=>{
            for(let i=0; i<selectRowList.length ; i++){
                if(row.seq === selectRowList[i].seq && !row.status){
                    row.status = 'update';
                    break;
                }
            }
            return row;
        });
    }

    @action doApplyCell(selectRowList, applyCellValue){
        this.list = this.list.map((row)=>{
            for(let i=0; i<selectRowList.length ; i++){
                if(row.seq === selectRowList[i].seq && row.status){
                    for(let k in applyCellValue){
                        if(applyCellValue[k]){
                            row[k] = applyCellValue[k];
                        }
                    }
                    break;
                }
            }
            return row;
        });
    }

    @action doSave(selectRowList){
        const that = this;
        //ajax로 구현한다
        return new Promise(function(resolve, reject){
            that.list.map((o1)=>{
                let o = {...o1};
                for(let j=0; j<selectRowList.length ; j++){
                    if(o.seq === selectRowList[j].seq && o.status){
                        o.useyn = o.useyn||'Y';
                        if(o.status === 'insert'){
                            o.status = null;
                            rows.push(o);
                        }else if(o.status === 'update'){
                            rows.map((a,b)=>{
                                if(a.seq === o.seq){
                                    o.status = null;
                                    rows[b] = o;
                                }
                            })
                        }
                        break;
                    }
                }
            });
            that.setSearchList();
            resolve();
        });
    }

    @action handleChange(e, id, seq){
        this.list = this.list.map((row)=>{
            let targetRow = null;
            if(row['seq'] === seq){
                row[id] = e.target.value||'';
                targetRow = row;
            }
            if(targetRow){
                if(row['population'] && row['size']){
                    row['density'] = (row['population'] / row['size']).toFixed(3);
                }else{
                    row['density'] = 0;
                }
            }
            return row;
        });
    }

    @action getRollBackListObj(seq){
        let idx = this.list.findIndex(e=>e.seq === seq);
        let status = this.list[idx].status;
        if(status === 'insert'){
            this.list.splice(idx, 1);
        }else{
            this.list[idx] = {...rows.find(e=>e.seq === seq)};
        }
    }



}
