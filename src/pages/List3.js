import React from "react";
import {inject, observer} from "mobx-react";
import {
    Checkbox,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    Input
} from '@material-ui/core';
import {TablePaginationActions, TableHeadActions} from "../actions";
import {Title} from "../components";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    paper: {
        color: theme.palette.secondary.main,
    },
}));

const List3 = inject('liststore')(observer((props)=>{
    const title = '데이터 검색';
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectRowList, setSelectRowList] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState({});

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setSelectRowList([]);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        setSelectRowList([]);
    };

    const isSelected = (key)=>{
        let idx = selectRowList.findIndex((item, i)=>{
            return item.code === key;
        });
        return idx;
    }

    const doSearch = (e)=>{
        setSelectRowList([]);
        setPage(0);
        props.liststore.selectList2(searchValue);
    }

    const handleRowClick = (e, row)=>{
        let key = row.code;
        let tmp = [...selectRowList];
        let selectedIndex = isSelected(key);
        if (selectedIndex === -1) {
            tmp.push(row);
        } else if (selectedIndex >= 0) {
            tmp.splice(selectedIndex, 1);
        }
        setSelectRowList(tmp);
    };

    /*React.useEffect(()=>{
        props.liststore.setSearchList();
        doSearch();
    }, []);*/

    React.useEffect(()=>{
        doSearch();
    }, [searchValue]);

    return (
        <React.Fragment>
            <Title>{title}</Title>
            <Grid container justify="center" spacing={1} style={{marginBottom : '10px'}}>
                <Grid item xs={12} className={classes.paper}>
                    ** 데이터 검색 (숫자는 더 큰값, 문자열은 포함값)
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHeadActions
                        list={props.liststore.list}
                        count={props.liststore.count}
                        setSelectRowList={setSelectRowList}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        selectRowList={selectRowList}
                        columns={props.liststore.columns}
                        doSearch={doSearch}
                    />
                    <TableBody>
                        {(rowsPerPage > 0
                                        ? props.liststore.list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : props.liststore.list
                                ).map((row) => {

                            const key = row.code;
                            const isItemSelected = isSelected(key);
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={key}
                                          onClick={(event) => handleRowClick(event, row)}
                                          aria-checked={isItemSelected}
                                          selected={(isItemSelected>-1)?true:false}
                                >
                                    <TableCell align="center" style={{padding:0}}>
                                        <Checkbox value={key}
                                                  checked={(isItemSelected>-1)?true:false}
                                        />
                                    </TableCell>
                                    {props.liststore.columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15, { label: 'All', value: -1 }]}
                                colSpan={6}
                                count={props.liststore.count}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}));

export default List3;


