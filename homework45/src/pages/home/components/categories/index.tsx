import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";

import { Panel, PanelToolBar } from "@/shared/components/panel";
import type { ICategories } from "@/store/category";
import { CategoriesLayout, CategoriesListStyle, CategoryItemStyle } from "./index.styles"
import { Add, Delete } from '@mui/icons-material';
import { AddCategoryDialog } from './addCategoryDialog';
import { useDialog } from '../../../../shared/hooks/useDialog';
import ConfirmDialog from '../../../../shared/components/confirmDialog';

export const CategoriesArea: React.FC = () => {
    const { open, openDialog, closeDialog, dialogValues } = useDialog();

    const deleteConfirmCallback = (context:any)=> {
        console.log('Requested to confirm category: ', context);
    }

    const { open: openConfirm, openDialog: openDialogConfirm, closeDialog: closeDialogConfirm, 
        dialogValues: dialogValuesConfirm } = useDialog(deleteConfirmCallback);


    const handleAddClick = () => {
        openDialog(null);
    }

    const handleDeleteClick = (e) => {
        openDialogConfirm({}, e.currentTarget.value);
    }

    const categories: ICategories = useSelector(state => state.categories);
    return (
        <CategoriesLayout>
            <Panel>
                <PanelToolBar title="Categories">
                    <IconButton aria-label="add" onClick={handleAddClick}>
                        <Add />
                    </IconButton>
                </PanelToolBar>
                <CategoriesListStyle>
                    {categories.items?.map((item) => {
                        return (
                            <CategoryItemStyle key={item.id + item.name}>
                                <h5>{item.name}</h5>
                                <p>{item.description}</p>
                                <p>Income: {item.balanceIncome}</p>
                                <p>Expense: {item.balanceExpense}</p>
                                <IconButton value={item.id} disabled={item.default} aria-label="delete" onClick={handleDeleteClick}>
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