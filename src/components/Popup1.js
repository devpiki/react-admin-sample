import {Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Button, ButtonGroup} from "@material-ui/core";
import React from "react";

export default function Popup1(props){
    return (
        <Dialog open={!!props.open} onClose={()=>{props.pupupClose('N')}} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"> {props.title} {props.open}</DialogTitle>
            <DialogContent>
                {props.columns.map((column, idx) => (
                    <TextField
                        key={idx}
                        required={column.required}
                        margin="dense" size="small" value={props.row[column.id]||''} onChange={props.handleChangePopup}
                        id={column.id}
                        label={column.label}
                        type="text"
                        fullWidth
                        variant="outlined"
                        disabled={column.readOnly || (props.open === '수정' && column.unique)}
                        inputProps={{style:{textAlign:column.align}}}
                        type={column.type}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <ButtonGroup aria-label="outlined primary button group" size="small">
                    <Button onClick={()=>{props.pupupClose('N')}} color="secondary">
                        취소
                    </Button>
                    <Button onClick={()=>{props.pupupClose('Y')}} color="primary">
                        저장
                    </Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );

}