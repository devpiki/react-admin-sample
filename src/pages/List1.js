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
    NativeSelect,
    Button,
    ButtonGroup,
    TableSortLabel
} from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {TablePaginationActions} from "../actions";
import {Title} from "../components";
import StyledTableCell from '../style/StyledTableCell';
import {SearchRounded as SearchRoundedIcon,
    AddBoxRounded as AddBoxRoundedIcon,
    DeleteForeverRounded as DeleteForeverRoundedIcon,
    SaveRounded as SaveRoundedIcon} from "@material-ui/icons";

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
const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];

const List1 = inject('liststore')(observer((props)=>{
    const title = '기본 리스트';
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectRowList, setSelectRowList] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('ALL');
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');

    const handleChange = (e)=>{
        setSearchValue(e.target.value||'');
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setSelectRowList([]);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        setSelectRowList([]);
    };

    const onSelectAllClick = (event)=>{
        if (event.target.checked) {
            const tmp = [...props.liststore.list];
            setSelectRowList(tmp);
            return ;
        }
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
        props.liststore.selectList(searchValue);
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

    const createSortHandler = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        props.liststore.sortList((isAsc ? 'desc' : 'asc'), property);
    };


    React.useEffect(()=>{
        props.liststore.setSearchList();
        doSearch();
    }, []);

    return (
        <React.Fragment>
            <Title>{title}</Title>
            <Grid container justify="center" spacing={1} style={{marginBottom : '10px'}}>
                <Grid item xs={12} className={classes.paper}>
                    ** 기본 리스트, 페이지처리, 정렬, 검색
                </Grid>
                <Grid item xs={6} style={{height:'30px'}}>
                    <NativeSelect value={searchValue} onChange={handleChange}
                                  style={{height : '28px'}}
                                  variant="outlined"
                                  color="primary"
                    >
                        {
                            !!props.liststore.searchList && props.liststore.searchList.length>0 && props.liststore.searchList.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))
                        }
                    </NativeSelect>
                    <Button color="primary" variant="outlined" startIcon={<SearchRoundedIcon/>}
                            style={{marginLeft:'10px'}} size="small" onClick={doSearch}>검색</Button>
                </Grid>
                <Grid item xs={6} style={{textAlign : 'right'}}>
                    {/*<ButtonGroup aria-label="outlined primary button group" size="small">
                        <Button color="primary" startIcon={<AddBoxRoundedIcon/>}>추가</Button>
                        <Button color="primary" startIcon={<SaveRoundedIcon/>}>수정</Button>
                        <Button color="secondary" startIcon={<DeleteForeverRoundedIcon/>}>삭제</Button>
                    </ButtonGroup>*/}
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell padding="checkbox">
                                <Checkbox value="all"
                                    checked={(props.liststore.count>0 && (selectRowList.length === props.liststore.count))?true:false}
                                    onChange={onSelectAllClick}/>
                            </StyledTableCell>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sortDirection={orderBy === column.id ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={createSortHandler(column.id)}
                                    >
                                        {column.label}
                                        {orderBy === column.id ? (
                                            <span className={classes.visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
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
                                    <TableCell padding="checkbox" style={{ width: 100 }}>
                                        <Checkbox value={key}
                                                  checked={(isItemSelected>-1)?true:false}
                                        />
                                    </TableCell>
                                    {columns.map((column) => {
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

export default List1;


