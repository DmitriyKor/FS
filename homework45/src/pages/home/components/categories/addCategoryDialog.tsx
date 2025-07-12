import React, { type AnyActionArg } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { Form, Field } from 'react-final-form';

import { requiredSelect, required, mustBeNumber } from "@/shared/validation";
import type { ICategories } from "@/store/category";
import { setHistory, type IHistoryItem } from "../../../../store/history";
import { addCategory, type ICategoryItem } from "../../../../store/category";

export const AddCategoryDialog = ({ open, closeDialog, dialogValues }) => {

    const handleClose = () => {
        closeDialog();
    };

    const dispatch = useDispatch();

    const OnSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        const categoryItem: ICategoryItem = {...event, default: false, balanceIncome: 0, balanceExpense:0}
        
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