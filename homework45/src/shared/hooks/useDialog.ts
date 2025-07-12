import React from "react";

export const useDialog = () => {
    const [open, setOpen] = React.useState(false);
    const [dialogValues, setDialogValues] = React.useState(null);

    const openDialog = (initialValues: any) => {
        setDialogValues(initialValues)
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };
    return { open, openDialog, closeDialog, dialogValues }
}