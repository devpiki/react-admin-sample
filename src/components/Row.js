import {
    Checkbox,
    TableCell,
    TableRow
} from "@material-ui/core";
import React from "react";

export default function Row(props){
    const row = props.row || {};
    const key = row.seq;
    const isSelected = (key)=>{
        let idx = props.selectRowList.findIndex((item, i)=>{
            return item.seq === key;
        });
        return idx;
    }

    const handleRowClick = (e, row)=>{
        if(!(e.target.tagName.toUpperCase() === 'TD' || e.target.tagName.toUpperCase() === 'TR' || e.target.type.toUpperCase() === 'CHECKBOX')){
            return;
        }
        let key = row.seq;
        let tmp = [...props.selectRowList];
        let selectedIndex = isSelected(key);
        if (selectedIndex === -1) {
            row.status = 'update';
            tmp.push({...row});
        } else if (selectedIndex >= 0) {
            props.getRollBackListObj(key);
            tmp.splice(selectedIndex, 1);
        }
        props.setSelectRowList(tmp);
    };

    const handleChange = (e, id, seq) => {
        props.handleChange(e, id, seq);
    };

    const isItemSelected = isSelected(key);

    return (
        <TableRow hover role="checkbox" tabIndex={-1} key={key}
                  onClickCapture={(event) => handleRowClick(event, props.row)}
                  aria-checked={isItemSelected}
                  selected={(isItemSelected>-1)?true:false}
        >
            <TableCell padding="checkbox" style={{ width: 100, textAlign:'center' }}>
                <Checkbox value={key}
                          checked={(isItemSelected>-1)?true:false}
                />
            </TableCell>
            {props.columns.map((column) => {
                const value = props.row[column.id];
                const ItemNode = column.ItemNode;
                return (
                    <TableCell key={column.id} align={column.align}>
                        {
                            ((row['status'] === 'insert' || row['status'] === 'update') && ItemNode)
                                ?(<ItemNode
                                    onChange={(e)=>{handleChange(e, column.id, row['seq'])}}
                                    value={value||''}
                                    inputProps={{style:{textAlign:column.align||''}}}
                                    disabled={column.disabled}/>)
                                :(value)
                        }
                    </TableCell>
                );
            })}
        </TableRow>
    );

}