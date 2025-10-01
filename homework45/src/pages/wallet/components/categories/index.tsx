import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from "@mui/material";

import { CategoriesLayout, CategoriesListStyle, CategoryItemStyle } from "./index.styles"
import { Add, Delete } from '@mui/icons-material';
import { AddCategoryDialog } from './addCategoryDialog';
import { useDialog } from '../../../../shared/hooks/useDialog';
import ConfirmDialog from '../../../../shared/components/confirmDialog';
import { deleteCategory, type ICategories, type ICategoryId, type ICategoryItem } from '../../../../store/category';
import type { RootState } from '../../../../store/store';
import { Panel } from '../../../../shared/components/panel';
import { ItemToolbarIcon, ItemToolbarIconGroup, ItemToolbarStyle, ItemToolbarText, PanelToolBarStyle, PanelToolBarText } from '../../../../shared/styles/styles';

export const CategoriesArea: React.FC = () => {
    const { open, openDialog, closeDialog, dialogValues } = useDialog();
    const dispatch = useDispatch();
    //const user = useSelector((state: RootState) => state.user);   

    const categories: ICategories = useSelector((state: RootState) => state.categories);

    const deleteConfirmCallback = (context: any) => {
        console.log('Requested to delete category: ', context);
        const categoryId: ICategoryId = { id: context };
        dispatch(deleteCategory(categoryId));
    }
    const { open: openConfirm, openDialog: openDialogConfirm, closeDialog: closeDialogConfirm } = useDialog(deleteConfirmCallback);

    const handleAddClick = () => {
        openDialog(null);
    }

    const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const value = (e.currentTarget as HTMLInputElement).value;
        openDialogConfirm({}, value);
    }

    return (
        <CategoriesLayout>
            <Panel>
                <PanelToolBarStyle>
                    <PanelToolBarText>Categories</PanelToolBarText>
                    <ItemToolbarIconGroup>
                        <ItemToolbarIcon>
                            <IconButton aria-label="add" onClick={handleAddClick}>
                                <Add />
                            </IconButton>
                        </ItemToolbarIcon>
                    </ItemToolbarIconGroup>
                </PanelToolBarStyle>

                <CategoriesListStyle>
                    {categories.items?.map((item: ICategoryItem) => {
                        return (
                            <CategoryItemStyle key={item._id + item.name}>
                                <ItemToolbarStyle>
                                    <ItemToolbarText>{item.name}</ItemToolbarText>
                                    <ItemToolbarIconGroup>
                                        <ItemToolbarIcon>
                                            <IconButton size='small' value={item._id} disabled={item.default || item.incomeAmount > 0 || item.expenseAmount > 0} aria-label="delete" onClick={handleDeleteClick}>
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </ItemToolbarIcon>
                                    </ItemToolbarIconGroup>
                                </ItemToolbarStyle>
                                <h5>{item.description}</h5>
                                <p>Income: {item.incomeAmount}</p>
                                <p>Expense: {item.expenseAmount}</p>
                            </CategoryItemStyle>
                        )
                    })}
                </CategoriesListStyle>
            </Panel>
            {AddCategoryDialog({ open, closeDialog, dialogValues })}
            {ConfirmDialog({ open: openConfirm, closeDialog: closeDialogConfirm, title: "Delete", message: "Delete category?" })}
        </CategoriesLayout>
    )
}