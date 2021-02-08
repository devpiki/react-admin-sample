import React from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TableFooter} from "@material-ui/core";
import {TablePaginationActions} from "./index";

const SubTableActions = (props)=>{
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    (rowsPerPage > 0
                            ? props.list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.list
                    ).map((row) => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.type}</TableCell>
                            </TableRow>
                        );
                    })
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[3, 5, 10, { label: 'All', value: -1 }]}
                        colSpan={6}
                        count={props.list.length}
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
    );
}

export default SubTableActions;