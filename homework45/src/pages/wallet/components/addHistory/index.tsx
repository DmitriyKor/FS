import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material';

import { Panel, PanelToolBar } from "@/shared/components/panel"
import { AddHistoryLayout } from "./index.styles"
import type { ICategories } from '@/store/category';
import { addHistory, OPERATION_TYPE, type IHistoryItem } from '@/store/history';
import { required, mustBeNumber } from '@/shared/validation';
import { requiredSelect } from '@/shared/validation';
import type { IUser } from '../../../../store/user';

export const AddHistoryArea = () => {

    const dispatch = useDispatch();
    const categories: ICategories = useSelector(state => state.categories);
    const user: IUser = useSelector(state => state.user);

    const onSubmit = async (data, form) => {
        console.log('AddHistory onSubmit, data is');
        console.log(data);
        console.log(user);

        let item: IHistoryItem = {
            id: "",
            userId: user.data?.id,
            categoryId: data.category,
            comment: data.comment,
            income: data.type == OPERATION_TYPE.income ? data.amount: 0,
            expense: data.type == OPERATION_TYPE.expense ? data.amount: 0,
        }

        console.log(item);
        await dispatch(addHistory(item));
        form.restart();
    }

    return (
        <AddHistoryLayout>
            <Panel>
                <PanelToolBar title='Add history'>
                </PanelToolBar>
                <Form
                    onSubmit={onSubmit}
                    initialValues={{ type: OPERATION_TYPE.income }}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>

                            <Stack spacing={2}>
                                <Field name="type" type='radio'>
                                    {({ input, meta }) => (
                                        <FormControl>
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
                                            <InputLabel id="demo-simple-select-label">
                                                Category
                                            </InputLabel>
                                            <Select
                                                {...input}
                                                size="small"
                                                error={meta.error && meta.touched}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // helperText='Select the category'
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
                            <Button sx={{mt: 2}} variant="outlined" type='submit'>Add</Button>
                        </form>
                    )}
                />
            </Panel>
        </AddHistoryLayout >
    )
}