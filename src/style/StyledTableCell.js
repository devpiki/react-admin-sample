import {withStyles} from "@material-ui/core/styles";
import {TableCell} from "@material-ui/core";
import React from "react";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#e6e6e6',
        borderTop : '1px solid #c7c7c7',
        borderBottom : '1px solid #c7c7c7',
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export default StyledTableCell;