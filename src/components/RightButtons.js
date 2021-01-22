import React from 'react';
import {Button, ButtonGroup, Grid} from "@material-ui/core";
import {
    AddBoxRounded as AddBoxRoundedIcon,
    DeleteForeverRounded as DeleteForeverRoundedIcon,
    ListAltRounded as ListAltRoundedIcon,
    SaveRounded as SaveRoundedIcon
} from "@material-ui/icons";

export default function RightButtons(props){

    return (
        <Grid item xs={6} style={{textAlign : 'right'}}>
            <ButtonGroup aria-label="outlined primary button group" size="small">
                <Button color="primary" onClick={props.doAdd} startIcon={<AddBoxRoundedIcon/>}>추가</Button>
                <Button color="primary" onClick={props.doUpdate} startIcon={<SaveRoundedIcon/>}>수정</Button>
                <Button color="secondary" onClick={props.doDelete} startIcon={<DeleteForeverRoundedIcon/>}>삭제</Button>
            </ButtonGroup>
        </Grid>
    );

}