import {withStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import React from "react";

const LogoutButton = withStyles((theme) => ({
    root: {
        color: '#fff',
        backgroundColor: '#4f5964',
        '&:hover': {
            backgroundColor: '#0066cc',
        },
        height : '26px',
        lineHeight: '16px'
    },
}))(Button);

export default LogoutButton;