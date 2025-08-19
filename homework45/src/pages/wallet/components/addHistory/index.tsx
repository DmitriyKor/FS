import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material';

import { AddHistoryLayout } from "./index.styles"
import type { IUser } from '../../../../store/user';
import type { ICategories, ICategoryItem } from '../../../../store/category';
import type { RootState } from '../../../../store/store';
import { mustBeNumber, required, requiredSelect } from '../../../../shared/validation';
import { addHistory, OPERATION_TYPE, type IHistoryItem } from '../../../../store/history';
import { Panel, PanelToolBar } from '../../../../shared/components/panel';

export const AddHistoryArea = () => {

    const dispatch = useDispatch();
    const categories: ICategories = useSelector((state : RootState) => state.categories);
    const user: IUser = useSelector((state : RootState)=> state.user);

    const onSubmit = async (data:any, form:any) => {
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
                                    {({ input }) => (
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
                                                {categories.items?.map((item: ICategoryItem) => {
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