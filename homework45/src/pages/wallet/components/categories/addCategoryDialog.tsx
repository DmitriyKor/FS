import React from "react";
import { useDispatch } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Stack, TextField } from "@mui/material";
import { Form, Field } from 'react-final-form';

import { addCategory, type ICategoryItem } from "../../../../store/category";
import { required } from "../../../../shared/validation";

export const AddCategoryDialog = ({ open, closeDialog, dialogValues } : any) => {

    const handleClose = () => {
        closeDialog();
    };

    const dispatch = useDispatch();

    const OnSubmit = (event: any) => {
        const categoryItem: ICategoryItem = {id: event.id, name: event.name, description: event.description, default: false, balanceIncome: 0, balanceExpense:0}        
        console.log('OnSubmit AddCategoryDialog:')
        console.log(categoryItem);
        dispatch(addCategory(categoryItem))
        handleClose();
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add category</DialogTitle>
                <DialogContent sx={{ paddingBottom: 0 }}>
                    <DialogContentText>
                        Specify the category's name and description
                    </DialogContentText>
                    <Form
                        onSubmit={OnSubmit}
                        initialValues={dialogValues}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={2}>
                                    
                                    <Field name="name" validate={required}>
                                        {({ input, meta }) => (
                                            <FormControl size="small">
                                                <TextField
                                                    {...input}
                                                    size="small"
                                                    error={meta.error && meta.touched}
                                                    label="Name"
                                                />
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="description" validate={required}>
                                        {({ input, meta }) => (
                                            <FormControl>
                                                <TextField
                                                    {...input}
                                                    size="small"
                                                    error={meta.error && meta.touched}
                                                    label="Description"
                                                />
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </FormControl>
                                        )}
                                    </Field>
                                </Stack>

                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">OK</Button>
                                </DialogActions>
                            </form>
                        )}
                    />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}