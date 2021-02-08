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
    ButtonGroup
} from '@material-ui/core';
import {TablePaginationActions} from "../actions";
import {Title, Popup1 as Popup} from "../components";
import StyledTableCell from '../style/StyledTableCell';
import {SearchRounded as SearchRoundedIcon,
    AddBoxRounded as AddBoxRoundedIcon,
    DeleteForeverRounded as DeleteForeverRoundedIcon,
    SaveRounded as SaveRoundedIcon} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const columns = [
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
        readOnly : true
    },
];

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

const List2 = inject('liststore')(observer((props)=>{
    const title = '리스트 데이터';
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectRowList, setSelectRowList] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('ALL');
    const [open, setOpen] = React.useState('');//수정, 추가
    const [row, setRow] = React.useState({});

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

    const handleChangePopup=(e)=>{
        let a = {...row};
        a[e.target.id]=e.target.value;
        if((+a['population']>0) && (+a['size']>0)){
            a['density'] = a['population'] / a['size'];
        }
        setRow(a);
    };

    const pupupClose = (stat)=>{
        if(stat === 'Y'){
            for (let i=0; i<columns.length ; i++){
                let column = columns[i];
                if(!row[column.id] && column.required){
                    alert(column.label + '은 필수 입니다.');
                    return false;
                }
                if(+column['population']<=0 || +column['size']<=0){
                    alert(column.label + '은 0보다 커야 합니다.');
                    return false;
                }
            }
            if(open === '추가'){
                for (let i=0; i<props.liststore.list.length ; i++){
                    let obj = props.liststore.list[i];
                    if(obj.code === row.code){
                        alert('code값은 unique 해야 합니다.');
                        return false;
                    }
                }
            }
            props.liststore
                .updateObj(row, open)
                .then(()=>{
                    alert(open + ' 되었습니다.');
                    setOpen('');
            });

        }else{
            setOpen('');
            setRow({});
        }
    };
    
    const doAdd = (e) => {
        setRow({});
        setOpen('추가');
    };

    const doUpdate=()=>{
        if(!selectRowList || selectRowList.length == 0){
            alert('수정 데이터를 선택해주세요');
            return false;
        }
        if(selectRowList.length > 1){
            alert('수정 데이터는 하나만 선택해주세요');
            return false;
        }
        setRow({...selectRowList[0]});
        setOpen('수정');
    };
    const doDelete=()=>{
        if(!selectRowList || selectRowList.length == 0){
            alert('삭제 데이터를 선택해주세요');
            return false;
        }
        props.liststore
            .deleteObj(selectRowList)
            .then(()=>{
                doSearch();
                alert('삭제 되었습니다.');
            });
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
                    ** 추가, 수정, 삭제
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
                    <ButtonGroup aria-label="outlined primary button group" size="small">
                        <Button color="primary" startIcon={<AddBoxRoundedIcon/>} onClick={doAdd}>추가</Button>
                        <Button color="primary" startIcon={<SaveRoundedIcon/>} onClick={doUpdate}>수정</Button>
                        <Button color="secondary" startIcon={<DeleteForeverRoundedIcon/>} onClick={doDelete}>삭제</Button>
                    </ButtonGroup>
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
                                >
                                    {column.label}
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

            {
                !!open && <Popup
                    title={title}
                    open={open}
                    columns={columns}
                    pupupClose={pupupClose}
                    row={row}
                    handleChangePopup={handleChangePopup}
                />
            }
        </React.Fragment>
    );
}));

export default List2;


