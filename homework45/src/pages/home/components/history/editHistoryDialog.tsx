import React, { type AnyActionArg } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { Form, Field } from 'react-final-form';

import { OPERATION_TYPE } from "@/store/history";
import { requiredSelect, required, mustBeNumber } from "@/shared/validation";
import type { ICategories } from "@/store/category";
import { setHistory, type IHistoryItem } from "../../../../store/history";

export const EditHistoryDialog = ({ open, closeDialog, dialogValues }) => {

    const categories: ICategories = useSelector(state => state.categories);

    const dispatch = useDispatch();

    const handleClose = () => {
        closeDialog();
    };

    const OnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const historyItem: IHistoryItem = {
            id: event.id,
            categoryId: event.category,
            comment: event.comment,
            income: event.type == OPERATION_TYPE.income ? event.amount : 0,
            expense: event.type == OPERATION_TYPE.expense ? event.amount : 0,
        }
        console.log(historyItem);
        dispatch(setHistory(historyItem))
        handleClose();
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit history</DialogTitle>
                <DialogContent sx={{ paddingBottom: 0 }}>
                    <DialogContentText>
                        Set the new properties for this history item
                    </DialogContentText>
                    <Form
                        onSubmit={OnSubmit}
                        initialValues={dialogValues}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={2}>
                                    <Field name="type" type='radio'>
                                        {({ input, meta }) => (
                                            <FormControl>
                                                {/* <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel> */}
                                                <RadioGroup
                                                    {...input}
                                                    row
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue={OPERATION_TYPE.income}
                                                    name="type"                              >
                                                    <FormControlLabel value={OPERATION_TYPE.income} control={<Radio size="small" />} label="Income" />
                                                    <FormControlLabel value={OPERATION_TYPE.expense} control={<Radio size="small" />} label="Expense" />
                                                </RadioGroup>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="category" validate={requiredSelect}>
                                        {({ input, meta }) => (
                                            <FormControl fullWidth>
                                                <InputLabel>
                                                    Category
                                                </InputLabel>
                                                <Select
                                                    {...input}
                                                    size="small"
                                                    error={meta.error && meta.touched}
                                                    labelId="demo-simple-select-label"
                                                    label="Category"
                                                >
                                                    {categories.items?.map((item) => {
                                                        return (
                                                            <MenuItem value={item.id} key={item.id + item.name}>{item.name}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="comment" validate={required}>
                                        {({ input, meta }) => (
                                            <FormControl size="small">
                                                <TextField
                                                    {...input}
                                                    size="small"
                                                    error={meta.error && meta.touched}
                                                    id="outlined-required"
                                                    label="Comment"
                                                />
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="amount" validate={mustBeNumber}>
                                        {({ input, meta }) => (
                                            <FormControl>
                                                <TextField
                                                    {...input}
                                                    type='number'
                                                    size="small"
                                                    error={meta.error && meta.touched}
                                                    id="outlined-required"
                                                    label="Amount"
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