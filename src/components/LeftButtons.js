import React from 'react';
import {Button, Grid, NativeSelect} from "@material-ui/core";
import {SearchRounded as SearchRoundedIcon} from "@material-ui/icons"

export default function LeftButtons(props){

    return (
        <Grid item xs={6} style={{height:'30px'}}>
            <NativeSelect value={props.searchPacode} onChange={props.handleChange}
                    style={{height : '28px'}}
                    variant="outlined"
                    color="primary"
            >
                {
                    !!props.adminAreaList && props.adminAreaList.length >0 && props.adminAreaList.map((opt) => (
                        <option key={opt.personnelAreaCode} value={opt.personnelAreaCode}>
                            {opt.personnelAreaName}
                        </option>
                    ))
                }
            </NativeSelect>
            <Button color="primary" variant="outlined" onClick={props.searchList} startIcon={<SearchRoundedIcon/>}
                    style={{marginLeft:'10px'}} size="small">검색</Button>
        </Grid>
    );
}