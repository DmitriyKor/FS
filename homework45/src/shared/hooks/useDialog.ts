import React from "react";

type DialogCallback = (context:any) => void;

export const useDialog = (closeCallback: DialogCallback) => {
    const [open, setOpen] = React.useState(false);
    const [dialogValues, setDialogValues] = React.useState(null);
    const [closeContext, setCloseContext] = React.useState(null);

    const openDialog = (initialValues: any, context:any):void => {     
        setDialogValues(initialValues)
        setCloseContext(context);
        setOpen(true);
    };
    
    const closeDialog = (callCloseCallback:boolean):void => {
        setOpen(false);
        if (callCloseCallback && closeCallback) {closeCallback(closeContext)}
    };
    
    return { open, openDialog, closeDialog, dialogValues }
}