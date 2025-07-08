import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';

import { Panel, PanelToolBar } from "@/shared/components/panel"
import { AddHistoryLayout } from "./index.styles"
import type { ICategories } from '@/store/category';
import { addHistory, OPERATION_TYPE, type IHistoryItem } from '@/store/history';
import {required, mustBeNumber} from '@/shared/validation';

export const AddHistoryArea = () => {

    const dispatch = useDispatch();
    const categories: ICategories = useSelector(state => state.categories);

    const onSubmit = (data) => {
        console.log("onSubmit. data is");
        console.log(data);
        let item: IHistoryItem = {
            id: "1",
            categoryId: data.category,
            comment: data.comment,
            income: 0,
            expense: 0
        }
        data.type==OPERATION_TYPE.income ? item.income = data.amount : item.expense = data.amount;
        dispatch(addHistory(item))
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
                            <div>
                                <label>Type</label>                                                          
                                <label>
                                    <Field name="type" component="input"
                                        type="radio" value={OPERATION_TYPE.income}                                  />{' '}
                                    Income
                                </label>
                                <label>
                                    <Field name="type" component="input" 
                                        value={OPERATION_TYPE.expense} type="radio"
                                    />{' '}
                                    Expense
                                </label>
                            </div>

                            <Field name="category" validate={required}>
                                {({ input, meta }) => (
                                    <label>Category
                                        <select {...input}>
                                            {
                                                categories.items?.map((item) => {
                                                    return (
                                                        <option value={item.id} label={item.name} key={item.id + item.name}>
                                                            {item.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </label>
                                )}
                            </Field>

                            <Field name="comment" validate={required}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>Comment</label>
                                        <input {...input} type="text" placeholder="Comment" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            
                            <Field name="amount" validate={mustBeNumber}>
                                {({ input, meta }) => (
                                    <div>
                                        <label>Amount</label>
                                        <input {...input} type="number" placeholder="Amount" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <button type="submit" >
                                Add
                            </button>
                        </form>
                    )}
                />

            </Panel>
        </AddHistoryLayout>
    )
}