import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ID_OK = 'ok';
const ID_CANCEL = 'cancel';

interface IConfirmDialogProps {
  open: boolean;
  closeDialog : (c: boolean)=>void;
  title: string;
  message : string;
}

export default function ConfirmDialog({ open, closeDialog, title, message} : IConfirmDialogProps) {

  const handleClose : React.MouseEventHandler<HTMLButtonElement> = (event):void =>{
    const id = (event.target as HTMLInputElement).id;
    closeDialog(id==ID_OK);
  }
    
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id={ID_CANCEL} onClick={handleClose}>Cancel</Button>
          <Button id={ID_OK} onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}