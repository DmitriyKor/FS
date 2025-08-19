import React from "react";

type DialogCallback = ((context:any) => void) | undefined;

export const useDialog = (closeCallback: DialogCallback = undefined) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [dialogValues, setDialogValues] = React.useState<object|null>(null);
    const [closeContext, setCloseContext] = React.useState<any>(null);

    const openDialog = (initialValues: any, closeCont:any=0):void => {     
        setDialogValues(initialValues)
        setCloseContext(closeCont);
        setOpen(true);
    };
    
    const closeDialog = (callCloseCallback:boolean):void => {
        setOpen(false);
        if (callCloseCallback && closeCallback) {closeCallback(closeContext)}
    };
    
    return { open, openDialog, closeDialog, dialogValues }
}