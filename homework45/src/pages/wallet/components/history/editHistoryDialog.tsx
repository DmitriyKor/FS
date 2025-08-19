import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from "@mui/material";
import { Form, Field } from 'react-final-form';

import { OPERATION_TYPE, setHistory, type IHistoryItem } from "../../../../store/history";
import type { ICategories, ICategoryItem } from "../../../../store/category";
import type { RootState } from "../../../../store/store";
import { requiredSelect, required, mustBeNumber } from "../../../../shared/validation";

// interface IEditHistoryDialogValues {
//     id : string;
//     userId: string;
//     categoryId: string;
//     comment: string;
//     amount : number;
// }

interface IEditHistoryDialogProps {
  open: boolean;
  closeDialog : any;
  dialogValues : any;
}

export const EditHistoryDialog = ({ open, closeDialog, dialogValues } : IEditHistoryDialogProps) => {

    const categories: ICategories = useSelector((state: RootState) => state.categories);

    const dispatch = useDispatch();

    const handleClose = () => {
        closeDialog();
    };

    const OnSubmit = (ev: any):void => {
       
        const historyItem: IHistoryItem = {
            id: ev.id,
            userId: ev.userId,
            categoryId: ev.category,
            comment: ev.comment,
            income: ev.type == OPERATION_TYPE.income ? ev.amount : 0,
            expense: ev.type == OPERATION_TYPE.expense ? ev.amount : 0,
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
                                        {({ input }) => (
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
                                                    {categories.items?.map((item : ICategoryItem) => {
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