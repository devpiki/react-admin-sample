import {Button, Checkbox, Input, TableCell, TableHead, TableRow} from "@material-ui/core";
import StyledTableCell from "../style/StyledTableCell";
import React from "react";

const TableHeadActions = (props) => {

    const onSelectAllClick = (event)=>{
        if (event.target.checked) {
            const tmp = [...props.list];
            props.setSelectRowList(tmp);
            return ;
        }
        props.setSelectRowList([]);
    };

    const onSearchChange = (e)=>{
        let a = {...props.searchValue};
        a[e.target.id] = e.target.value;
        props.setSearchValue(a);
    }


    return (
        <TableHead>
            <TableRow>
                <StyledTableCell align="center" style={{padding:0}}>
                    <Checkbox value="all"
                              checked={(props.count>0 && (props.selectRowList.length === props.count))?true:false}
                              onChange={onSelectAllClick}/>
                </StyledTableCell>
                {props.columns.map((column) => (
                    <StyledTableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                    >
                        {column.label}
                    </StyledTableCell>
                ))}
            </TableRow>
            <TableRow>
                <TableCell align="center" style={{padding:'2px'}}>
                    <Button color="primary" variant="outlined" size="small" onClick={props.doSearch}>검색</Button>
                </TableCell>
                {props.columns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, padding : '2px' }}
                    >
                        <Input
                            defaultValue=""
                            inputProps={{ 'aria-label': 'search' }}
                            id={column.id}
                            autoComplete="off"
                            inputProps={{style:{textAlign : column.align}}}
                            onChange={onSearchChange}/>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default TableHeadActions;
