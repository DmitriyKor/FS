import React from "react";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, IconButton, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Delete, EditDocument } from '@mui/icons-material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { HistoryItemStyle, HistoryLayout, HistoryListStyle } from "./index.styles";
import { EditHistoryDialog } from "./editHistoryDialog";
import { deleteHistory, fetchHistory, OPERATION_TYPE, type IHistory, type IHistoryId, type IHistoryItem } from "../../../../store/history";
import ConfirmDialog from "../../../../shared/components/confirmDialog";
import type { IUser } from "../../../../store/user";
import type { RootState } from "../../../../store/store";
import { useDialog } from "../../../../shared/hooks/useDialog";
import { Panel } from "../../../../shared/components/panel";
import { ItemToolbarIcon, ItemToolbarIconGroup, ItemToolbarStyle, ItemToolbarText, PanelToolBarStyle, PanelToolBarText } from "../../../../shared/styles/styles";
import { HISTORY_FILTER_ALL, HISTORY_FILTER_EXPENSE, HISTORY_FILTER_INCOME } from "../../../../store/history/const";

export const HistoryArea = () => {
    const history: IHistory = useSelector((state: RootState) => state.history);

    const user: IUser = useSelector((state: RootState) => state.user);
    const dispatch: Dispatch = useDispatch();

    const { open, openDialog, closeDialog, dialogValues } = useDialog();

    const deleteConfirmCallback = (context: any): void => {
        const historyId: IHistoryId = { _id: history.items[context]._id }
        dispatch(deleteHistory(historyId));
    }
    const { open: openC, openDialog: openCDialog, closeDialog: closeCDialog } = useDialog(deleteConfirmCallback);

    const handleEditClick: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
        const value = (e.currentTarget as HTMLInputElement).value;
        const idx: number = history.items.findIndex((item: IHistoryItem) => item._id == value);
        if (idx >= 0 && user.data) {
            const initialValues = {
                _id: history.items[idx]._id,
                type: (history.items[idx].income > 0) ? OPERATION_TYPE.income : OPERATION_TYPE.expense,
                categoryId: history.items[idx].categoryId,
                comment: history.items[idx].comment,
                amount: Math.max(Number(history.items[idx].income), Number(history.items[idx].expense)),
            }
            openDialog(initialValues);
        }
    }

    const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
        const value = (e.currentTarget as HTMLInputElement).value;
        const idx: number = history.items.findIndex((item: IHistoryItem) => item._id == value);
        if (idx >= 0) {
            openCDialog({}, idx);
        }
    }

    const HistoryList = () => {

        return (
            <HistoryListStyle>
                {history.items?.map(
                    (item: IHistoryItem) => {
                        return (
                            <HistoryItemStyle key={item._id}>
                                <ItemToolbarStyle>
                                    <ItemToolbarText>{item.comment}</ItemToolbarText>
                                    <ItemToolbarIconGroup>
                                        <ItemToolbarIcon>
                                            <IconButton aria-label="edit" value={item._id} onClick={handleEditClick}>
                                                <EditDocument fontSize="small" />
                                            </IconButton>
                                        </ItemToolbarIcon>
                                        <ItemToolbarIcon>
                                            <IconButton aria-label="delete" value={item._id} onClick={handleDeleteClick}>
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </ItemToolbarIcon>

                                    </ItemToolbarIconGroup>
                                </ItemToolbarStyle>
                                <p>Category: {item.categoryName}</p>
                                {item.income > 0 ? <p>Income: {item.income}</p> : <p>Expense: {item.expense}</p>}

                            </HistoryItemStyle>
                        )
                    }
                )}
            </HistoryListStyle>
        )
    }


    const FilterButtons = () => {

        const handleFilter = (
            event: React.MouseEvent<HTMLElement>,
            newFilter: string | null,
        ) => {
            dispatch(fetchHistory(newFilter))
        };

        return (
            <ToggleButtonGroup
                fullWidth
                sx={{ height: '28px', marginBottom: 1 }}
                size="small"
                value={history.filter}
                exclusive
                onChange={handleFilter}
                aria-label="history filter"
            >
                <ToggleButton value={HISTORY_FILTER_ALL} aria-label="left aligned">
                    All
                </ToggleButton>
                <ToggleButton value={HISTORY_FILTER_INCOME} aria-label="centered">
                   Income
                </ToggleButton>
                <ToggleButton value={HISTORY_FILTER_EXPENSE} aria-label="right aligned">
                    Expense
                </ToggleButton>
            </ToggleButtonGroup>
        );
    }
    return (
        <HistoryLayout>
            <Panel>
                <PanelToolBarStyle>
                    <PanelToolBarText>History</PanelToolBarText>
                </PanelToolBarStyle>
                <FilterButtons />
                <HistoryList />
                <EditHistoryDialog open={open} closeDialog={closeDialog} dialogValues={dialogValues} />
                <ConfirmDialog open={openC} closeDialog={closeCDialog} title="Delete" message="Delete history item?" />
            </Panel>
        </HistoryLayout>
    )
}
