import React from "react";
import {inject, observer} from "mobx-react";
import {
    Checkbox,
    Grid,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    NativeSelect,
    Button,
    ButtonGroup, TextField, Select, TableCell
} from '@material-ui/core';
import {Title, Row} from "../components";
import StyledTableCell from '../style/StyledTableCell';
import {SearchRounded as SearchRoundedIcon,
    AddBoxRounded as AddBoxRoundedIcon,
    DeleteForeverRounded as DeleteForeverRoundedIcon,
    SaveRounded as SaveRoundedIcon} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        color: theme.palette.secondary.main,
    },
    root: {
        width: '100%',
        maxHeight: 336,
    }
}));

const sel1 = function (props){
    return (<Select native onChange={props.onChange} value={props.value||'Y'}>
        <option value="Y">Yes</option>
        <option value="N">No</option>
    </Select>);
};

const txt1 = function(props){
    return (
        <TextField variant="outlined" size="small"
                   onChange={props.onChange}
                   value={props.value}
                   inputProps={props.inputProps}
                   disabled={props.disabled}
        />
    );
}

const columns = [
    { id: 'status', label: 'Status', minWidth: 50},
    { id: 'name', label: 'Name', minWidth: 170 , required : true, ItemNode : txt1},
    { id: 'seq', label: 'Seq', required : true, unique : true, disabled : true, ItemNode : txt1 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 , required : true, ItemNode : txt1},
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        required : true,
        type:'number',
        ItemNode : txt1
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        required : true,
        type:'number',
        ItemNode : txt1
    },
    {
        id: 'density',
        label: 'Density',
        align: 'right',
        disabled : true,
        type:'number',
        ItemNode : txt1
    },
    {
        id: 'useyn',
        label: 'UseYn',
        minWidth: 50,
        align: 'center',
        type:'select',
        ItemNode : sel1
    },
];

const List5 = inject('listeditstore')(observer((props)=>{
    const title = '데이터 수정2';
    const classes = useStyles();
    const [selectRowList, setSelectRowList] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('ALL');
    const [applyCellValue, setApplyCellValue] = React.useState({});

    const handleChange = (e)=>{
        setSearchValue(e.target.value||'');
    };

    const handleApplyCellChange = (e, id)=>{
        let tmp = {...applyCellValue};
        tmp[id] = e.target.value||'';
        setApplyCellValue(tmp);
    };

    const onSelectAllClick = (event)=>{
        if (event.target.checked) {
            const tmp = [...props.listeditstore.list];
            setSelectRowList(tmp);
            return ;
        }
        setSelectRowList([]);
    };

    const doSearch = (e)=>{
        setSelectRowList([]);
        props.listeditstore.selectList(searchValue);
    }

    const doAdd = () => {
        props.listeditstore
            .doAdd()
            .then((row)=>{
                setSelectRowList([...selectRowList, row]);
                const tablePaper = document.getElementById("tablePaper");
                tablePaper.scrollTop = tablePaper.scrollHeight;
            });
    };

    /*const doUpdate = ()=>{
        if(!selectRowList || selectRowList.length == 0){
            alert('수정 데이터를 선택해주세요');
            return false;
        }
        props.listeditstore.doUpdate(selectRowList);
    };*/

    const doApplyCell = ()=>{
        if(!selectRowList || selectRowList.length == 0){
            alert('데이터를 선택해주세요');
            return false;
        }
        props.listeditstore.doApplyCell(selectRowList, applyCellValue);

    };

    const handleChangeEdit = (e, id, seq)=>{
        props.listeditstore.handleChange(e, id, seq);
    };
    const doDelete=()=>{
        if(!selectRowList || selectRowList.length == 0){
            alert('삭제 데이터를 선택해주세요');
            return false;
        }
        props.listeditstore
            .deleteObj(selectRowList)
            .then(()=>{
                doSearch();
                alert('삭제 되었습니다.');
            });
    };

    const getRollBackListObj=(seq)=>{
        props.listeditstore.getRollBackListObj(seq);
    };

    const doSave=()=>{
        if(!selectRowList || selectRowList.length == 0){
            alert('저장 데이터를 선택해주세요.');
            return false;
        }
        props.listeditstore
            .doSave(selectRowList)
            .then(()=>{doSearch();alert('저장 되었습니다.');});
    };

    React.useEffect(()=>{
        props.listeditstore.setSearchList();
        doSearch();
    }, []);

    return (
        <React.Fragment>
            <Title>{title}</Title>
            <Grid container justify="center" spacing={1} style={{marginBottom : '10px'}}>
                <Grid item xs={12} className={classes.paper}>
                    ** 추가 : row 추가 / 수정 : 선택한 row 수정모드로 변경 / 저장 : 선택한 row만 저장 / 삭제 : 선택한 row 삭제, insert 데이터는 전체 삭제
                </Grid>
                <Grid item xs={6} style={{height:'30px'}}>
                    ISO Code :: <NativeSelect value={searchValue} onChange={handleChange}
                                  style={{height : '28px'}}
                                  variant="outlined"
                                  color="primary"
                    >
                        {
                            !!props.listeditstore.searchList && props.listeditstore.searchList.length>0 && props.listeditstore.searchList.map((opt) => (
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
                        {/*<Button color="default" startIcon={<SaveRoundedIcon/>} onClick={doUpdate}>수정</Button>*/}
                        <Button color="secondary" startIcon={<SaveRoundedIcon/>} onClick={doSave}>저장</Button>
                    </ButtonGroup>
                    <ButtonGroup aria-label="outlined primary button group" size="small" style={{marginLeft: '10px'}}>
                        <Button color="secondary" startIcon={<DeleteForeverRoundedIcon/>} onClick={doDelete}>삭제</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            <TableContainer component={Paper} className={classes.root} id="tablePaper">
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell padding="checkbox">
                                <Checkbox value="all"
                                          checked={(props.listeditstore.count>0
                                              && (selectRowList.length === props.listeditstore.count))?true:false}
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
                        <TableRow>
                            <TableCell align="center" style={{padding:'2px'}}>
                                <Button color="primary" variant="outlined" size="small" onClick={doApplyCell}>반영</Button>
                            </TableCell>
                            {columns.map((column) => {
                                const ItemNode = column.ItemNode;
                                return (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                    >
                                        {
                                            (ItemNode && !column.disabled)
                                                ?(<ItemNode
                                                    value={applyCellValue[column.id]||''}
                                                    onChange={(e)=>{handleApplyCellChange(e, column.id)}}
                                                    inputProps={{style:{textAlign:column.align||''}}}/>)
                                                :('')
                                        }
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.listeditstore.list && props.listeditstore.count > 0 && props.listeditstore.getList.map(row => {
                                return <Row row={row}
                                            key={row.seq}
                                            selectRowList={selectRowList}
                                            setSelectRowList={setSelectRowList}
                                            columns={columns}
                                            handleChange={handleChangeEdit}
                                            getRollBackListObj={getRollBackListObj}/>;
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}));

export default List5;


