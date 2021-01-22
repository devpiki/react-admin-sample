import {Button, ButtonGroup} from "@material-ui/core";
import React from "react";

export default function PopupButtons(props){
    return (
        <ButtonGroup aria-label="outlined primary button group" size="small">
            <Button onClick={()=>{props.pupupClose('N')}} color="secondary">
                취소
            </Button>
            <Button onClick={()=>{props.pupupClose('Y')}} color="primary">
                저장
            </Button>
        </ButtonGroup>
    );
}