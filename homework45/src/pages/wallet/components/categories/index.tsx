import { useDispatch, useSelector } from 'react-redux';
import {IconButton} from "@mui/material";

import { CategoriesLayout, CategoriesListStyle, CategoryItemStyle } from "./index.styles"
import { Add, Delete } from '@mui/icons-material';
import { AddCategoryDialog } from './addCategoryDialog';
import { useDialog } from '../../../../shared/hooks/useDialog';
import ConfirmDialog from '../../../../shared/components/confirmDialog';
import { deleteCategory, type ICategories, type ICategoryId, type ICategoryItem } from '../../../../store/category';
import type { RootState } from '../../../../store/store';
import { Panel, PanelToolBar } from '../../../../shared/components/panel';

export const CategoriesArea: React.FC = () => {
    const { open, openDialog, closeDialog, dialogValues } = useDialog();
    const dispatch = useDispatch();
    //const user = useSelector((state: RootState) => state.user);   

    const categories: ICategories = useSelector((state : RootState) => state.categories);
    
    const deleteConfirmCallback = (context:any)=> {
        console.log('Requested to delete category: ', context);
        const categoryId: ICategoryId = {id: context};
        dispatch(deleteCategory(categoryId));
    }
    const { open: openConfirm, openDialog: openDialogConfirm, closeDialog: closeDialogConfirm } = useDialog(deleteConfirmCallback);

    const handleAddClick = () => {
        openDialog(null);
    }
    
    const handleDeleteClick : React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const value = (e.currentTarget as HTMLInputElement).value;
        openDialogConfirm({}, value);
    }
    
    return (
        <CategoriesLayout>
            <Panel>
                <PanelToolBar title="Categories">
                    <IconButton aria-label="add" onClick={handleAddClick}>
                        <Add />
                    </IconButton>
                </PanelToolBar>
                <CategoriesListStyle>
                    {categories.items?.map((item: ICategoryItem) => {
                        return (
                            <CategoryItemStyle key={item.id + item.name}>
                                <h5>{item.name}</h5>
                                <p>{item.description}</p>
                                <p>Income: {item.balanceIncome}</p>
                                <p>Expense: {item.balanceExpense}</p>
                                <IconButton value={item.id} disabled={item.default || item.balanceIncome > 0 || item.balanceExpense > 0} aria-label="delete" onClick={handleDeleteClick}>
                                    <Delete />
                                </IconButton>
                            </CategoryItemStyle>
                        )
                    })}
                </CategoriesListStyle>
            </Panel>
            {AddCategoryDialog({ open, closeDialog, dialogValues })}
            {ConfirmDialog({open:openConfirm, closeDialog:closeDialogConfirm, title:"Delete", message:"Delete category?"})}
        </CategoriesLayout>
    )
}