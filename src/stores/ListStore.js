import {action, observable, makeObservable} from 'mobx';
import axios from 'axios';
import * as common from "../common/common";

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
    createData('India2', 'IN2', 1324171354, 3287263),
    createData('China2', 'CN2', 1403500365, 9596961),
    createData('Italy2', 'IT2', 60483973, 301340),
    createData('United States2', 'US2', 327167434, 9833520),
    createData('Canada2', 'CA2', 37602103, 9984670),
    createData('Australia2', 'AU2', 25475400, 7692024),
    createData('Germany2', 'DE2', 83019200, 357578),
    createData('Ireland2', 'IE2', 4857000, 70273),
    createData('Mexico2', 'MX2', 126577691, 1972550),
    createData('Japan2', 'JP2', 126317000, 377973),
];

export default class ListStore {
    @observable list = [];
    @observable count = 0;
    @observable searchList = [];

    constructor() {
        makeObservable(this);
    }

    @action setList = (list, cnt) => {this.list = list;this.count = cnt;}

    @action setSearchList(){
        let lst = rows.map(e=>{
            let row = {...e};
            return row.code[0];
        });
        lst = [...new Set(lst)].sort();
        lst.unshift('ALL');
        this.searchList = lst;
    }

    @action selectList(code){
        let result = [...rows];
        if(code !== 'ALL'){
            result = rows.filter((item) => {
                return item.code[0] === code;
            });
        }
        this.setList(result, result.length);

    }

    @action sortList(order, orderBy){
        let result = [...this.list];
        result.sort((a, b)=>{
            if(a[orderBy] > b[orderBy]) return ((order==='asc'?1:-1));
            if(a[orderBy] < b[orderBy]) return ((order==='asc'?-1:1));
            if(a[orderBy] === b[orderBy]) return 0;
        });
        this.setList(result, result.length);
    }

    @action updateObj(row, open){
        let that = this;
        return new Promise(function(resolve, reject){
            if(open === '추가'){
                rows.push(row);
                that.setList(rows, rows.length);
                that.setSearchList();
            }else if(open === '수정'){
                for(let i=0; i<rows.length ; i++){
                    let obj = rows[i];
                    if(row.code === obj.code){
                        rows[i] = row;
                        break;
                    }
                }
            }
            resolve();
        });
    }

    @action deleteObj(selectRowList){
        let that = this;
        return new Promise(function(resolve, reject){
            for(let i=(rows.length-1); i>=0 ; i--){
                for(let j=0; j<selectRowList.length ; j++){
                    if(selectRowList[j].code === rows[i].code){
                        rows.splice(i, 1);
                        break;
                    }
                }
            }
            that.setSearchList();
            resolve();
        });
    }

}
