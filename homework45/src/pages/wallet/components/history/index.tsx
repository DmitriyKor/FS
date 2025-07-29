import React, { useEffect, type AnyActionArg } from "react";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { Delete, EditDocument } from '@mui/icons-material';

import { Panel, PanelToolBar } from "@/shared/components/panel"
import type { IHistory } from "@/store/history";
import { HistoryLayout, HistoryListStyle } from "./index.styles";
import { OPERATION_TYPE } from "@/store/history";
import { EditHistoryDialog } from "./editHistoryDialog";
import { deleteHistory, type IHistoryId, type IHistoryItem } from "../../../../store/history";
import ConfirmDialog from "../../../../shared/components/confirmDialog";
import type { IUser } from "../../../../store/user";
import type { RootState } from "../../../../store/store";
import { useDialog } from "../../../../shared/hooks/useDialog";

export const HistoryArea = () => {
    const history: IHistory = useSelector((state : RootState) => state.history);
    const user: IUser = useSelector((state : RootState) => state.user);
    const dispatch: Dispatch = useDispatch();

    const { open, openDialog, closeDialog, dialogValues } = useDialog();

    const deleteConfirmCallback = (context: any): void => {
        const historyId: IHistoryId = { id: history.items[context].id };
        dispatch(deleteHistory(historyId));
    }
    const { open: openC, openDialog: openCDialog, closeDialog: closeCDialog } = useDialog(deleteConfirmCallback);

    const handleEditClick : React.MouseEventHandler<HTMLButtonElement> = (e):void => {
        const value = (e.currentTarget as HTMLInputElement).value;
        const idx: number = history.items.findIndex((item: IHistoryItem) => item.id == value);
        if (idx >= 0 && user.data) {
            const initialValues = {
                id: history.items[idx].id,
                userId: user.data.id,
                type: (history.items[idx].income > 0) ? OPERATION_TYPE.income : OPERATION_TYPE.expense,
                category: history.items[idx].categoryId,
                comment: history.items[idx].comment,
                amount: Math.max(Number(history.items[idx].income), Number(history.items[idx].expense)),
            }
            openDialog(initialValues);
        }
    }

    const handleDeleteClick : React.MouseEventHandler<HTMLButtonElement>  = (e) : void => {
        const value = (e.currentTarget as HTMLInputElement).value;
        const idx: number = history.items.findIndex((item : IHistoryItem) => item.id == value);
        if (idx >= 0) {
            openCDialog({}, idx);
        }
    }

    const HistoryList = () => {
        return (
            <HistoryListStyle>
                {history.items?.toReversed().map(
                    (item : IHistoryItem) => {
                        return (
                            <Card sx={{ m: 0.5 }} key={item.id + item.comment}>
                                <CardHeader sx={{ m: -0.5 }}
                                    title={item.comment}
                                    subheader={"Category id:" + item.categoryId}
                                    action={
                                        <>
                                            <IconButton aria-label="edit" value={item.id} onClick={handleEditClick}>
                                                <EditDocument />
                                            </IconButton>
                                            <IconButton aria-label="delete" value={item.id} onClick={handleDeleteClick}>
                                                <Delete />
                                            </IconButton>
                                        </>
                                    }
                                />
                                <CardContent>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {item.income > 0 ? item.income : item.expense}
                                    </Typography>
                                </CardContent>

                            </Card>
                        )
                    }
                )}
            </HistoryListStyle>
        )
    }

    return (
        <HistoryLayout>
            <Panel>
                <PanelToolBar title="History">
                </PanelToolBar>
                <HistoryList/>
                <EditHistoryDialog open={open} closeDialog={closeDialog} dialogValues={dialogValues} />
                <ConfirmDialog open={openC} closeDialog={closeCDialog} title="Delete" message="Delete history item?" />
            </Panel>
        </HistoryLayout>
    )
}
