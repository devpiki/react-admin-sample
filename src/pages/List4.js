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
    Button, IconButton
} from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {TablePaginationActions, SubTableActions} from "../actions";
import {Title} from "../components";
import StyledTableCell from '../style/StyledTableCell';
import {SearchRounded as SearchRoundedIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon} from "@material-ui/icons";

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

const List4 = inject('listsubstore')(observer((props)=>{
    const title = '서브리스트';
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectRow, setSelectRow] = React.useState(null);
    const [searchValue, setSearchValue] = React.useState('ALL');

    const handleChange = (e)=>{
        setSearchValue(e.target.value||'');
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setSelectRow(null);
        props.listsubstore.initSubList();
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        setSelectRow(null);
        props.listsubstore.initSubList();
    };

    const doSearch = (e)=>{
        setSelectRow(null);
        setPage(0);
        props.listsubstore.initSubList();
        props.listsubstore.selectList(searchValue);
    }

/*    const showSubList = (row, e)=>{
        debugger;
        row.subshow = !row.subshow;
        let sublist = props.listsubstore.selectSubList(row.code);
        row.sublist = sublist;
    };*/

    React.useEffect(()=>{
        debugger;
        props.listsubstore.setSearchList();
        doSearch();
    }, []);

    return (
        <React.Fragment>
            <Title>{title}</Title>
            <Grid container justify="center" spacing={1} style={{marginBottom : '10px'}}>
                <Grid item xs={12} className={classes.paper}>
                    ** 리스트 내 서브 리스트
                </Grid>
                <Grid item xs={6} style={{height:'30px'}}>
                    <NativeSelect value={searchValue} onChange={handleChange}
                                  style={{height : '28px'}}
                                  variant="outlined"
                                  color="primary"
                    >
                        {
                            !!props.listsubstore.searchList && props.listsubstore.searchList.length>0 && props.listsubstore.searchList.map((opt) => (
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
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell padding="checkbox">

                            </StyledTableCell>
                            {props.listsubstore.columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? props.listsubstore.list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : props.listsubstore.list
                        ).map((row) => {
                            const key = row.code;
                            return (
                                <React.Fragment key={key + '_fr'}>
                                    <TableRow hover role="checkbox" tabIndex={-1} key={key}
                                              onClick={(event) => setSelectRow(row)}
                                              selected={(selectRow && key === selectRow.code)?true:false}
                                    >
                                        <TableCell padding="checkbox">
                                            {
                                                (row.sub)?
                                                    <IconButton aria-label="expansion" size="small"
                                                                onClick={(e) => props.listsubstore.selectSubList(row)}>
                                                        {
                                                            (row.subshow)
                                                                ?<ExpandMoreIcon fontSize="inherit"/>
                                                                :<ExpandLessIcon fontSize="inherit"/>
                                                        }
                                                    </IconButton>
                                                :null
                                            }
                                        </TableCell>
                                        {props.listsubstore.columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                    {
                                        (row.sub && row.subshow)?(
                                            <TableRow key={key + '_sub'}>
                                                <TableCell>

                                                </TableCell>
                                                <TableCell colSpan="5">
                                                    <SubTableActions
                                                        list={row.sublist}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ):null
                                    }
                                </React.Fragment>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15, { label: 'All', value: -1 }]}
                                colSpan={6}
                                count={props.listsubstore.count}
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

export default List4;


