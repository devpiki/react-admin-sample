import {action, observable, makeObservable} from 'mobx';
import axios from 'axios';
import * as common from "../common/common";

function createData(name, code, population, size, sub, subshow) {
    const density = population / size;
    return { name, code, population, size, density, sub, subshow};
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263, true, false),
    createData('China', 'CN', 1403500365, 9596961, false, false),
    createData('Italy', 'IT', 60483973, 301340, true, false),
    createData('United States', 'US', 327167434, 9833520, false, false),
    createData('Canada', 'CA', 37602103, 9984670, true, false),
    createData('Australia', 'AU', 25475400, 7692024, false, false),
    createData('Germany', 'DE', 83019200, 357578, false, false),
    createData('Ireland', 'IE', 4857000, 70273, false, false),
    createData('Mexico', 'MX', 126577691, 1972550, true, false),
    createData('Japan', 'JP', 126317000, 377973, false, false),
    createData('France', 'FR', 67022000, 640679, false, false),
    createData('United Kingdom', 'GB', 67545757, 242495, false, false),
    createData('Russia', 'RU', 146793744, 17098246, false, false),
    createData('Nigeria', 'NG', 200962417, 923768, false, false),
    createData('Brazil', 'BR', 210147125, 8515767, false, false),
    createData('India2', 'IN2', 1324171354, 3287263, true, false),
    createData('China2', 'CN2', 1403500365, 9596961, false, false),
    createData('Italy2', 'IT2', 60483973, 301340, false, false),
    createData('United States2', 'US2', 327167434, 9833520, false, false),
    createData('Canada2', 'CA2', 37602103, 9984670, false, false),
    createData('Australia2', 'AU2', 25475400, 7692024, false, false),
    createData('Germany2', 'DE2', 83019200, 357578, false, false),
    createData('Ireland2', 'IE2', 4857000, 70273, false, false),
    createData('Mexico2', 'MX2', 126577691, 1972550, false, false),
    createData('Japan2', 'JP2', 126317000, 377973, false, false),
];

export default class ListSubStore {
    @observable list = [];
    @observable count = 0;
    @observable searchList = [];
    columns = [
        { id: 'name', label: 'Name', minWidth: 170 , required : true},
        { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 , required : true, unique : true},
        {
            id: 'population',
            label: 'Population',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
            required : true,
            type:'number'
        },
        {
            id: 'size',
            label: 'Size\u00a0(km\u00b2)',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
            required : true,
            type:'number'
        },
        {
            id: 'density',
            label: 'Density',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2),
            readOnly : true,
            type:'number'
        },
    ];

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
        //추후에 ajax 로 데이터를 가져온다.
        let result = [...rows];
        if(code !== 'ALL'){
            result = rows.filter((item) => {
                return item.code[0] === code;
            });
        }
        this.setList(result, result.length);
    }

    @action selectSubList(obj){
        this.list.map((row)=>{
            if(row.code === obj.code){
                row.subshow = !row.subshow;
                if(row.subshow){
                    //추후에 ajax 로 데이터를 가져온다.
                    row.sublist = [
                        { "id": "5001", "type": "None" },
                        { "id": "5002", "type": "Glazed" },
                        { "id": "5005", "type": "Sugar" },
                        { "id": "5007", "type": "Powdered Sugar" },
                        { "id": "5006", "type": "Chocolate with Sprinkles" },
                        { "id": "5003", "type": "Chocolate" },
                        { "id": "5004", "type": "Maple" }
                    ];
                }else{
                    row.sublist = null;
                }
                return ;
            }
        })
    }

    @action initSubList(){
        this.list.map((row)=>{
            row.subshow = false;
            row.sublist = null;
        })
    }


}
