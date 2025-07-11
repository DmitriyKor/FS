import React, { type AnyActionArg } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { EditDocument } from '@mui/icons-material';

import { Panel, PanelToolBar } from "@/shared/components/panel"
import type { IHistory } from "@/store/history";
import { HistoryLayout, HistoryListStyle } from "./index.styles";
import { OPERATION_TYPE } from "@/store/history";
import { EditHistoryDialog } from "./editHistoryDialog";
import { useDialog } from "@/shared/hooks/useDialog";


export const HistoryArea = () => {
    const history: IHistory = useSelector(state => state.history);
    const { open, openDialog, closeDialog, dialogValues } = useDialog();

    const handleEditClick = (e) => {
        const idx: number = history.items.findIndex(item => item.id == e.currentTarget.value);
        if (idx >= 0) {
            const initialValues = {
                id: history.items[idx].id,
                type: (history.items[idx].income > 0) ? OPERATION_TYPE.income : OPERATION_TYPE.expense,
                category: history.items[idx].categoryId,
                comment: history.items[idx].comment,
                amount: Math.max(Number(history.items[idx].income), Number(history.items[idx].expense)),
            }
            openDialog(initialValues);
        }
    }

    const historyList = () => {
        return (
            <HistoryListStyle>
                {history.items?.toReversed().map(
                    (item, index) => {
                        return (
                            <Card sx={{ m: 0.5 }} key={item.id + item.comment}>
                                <CardHeader sx={{ m: -0.5 }}
                                    title={item.comment}
                                    subheader={"Category id:" + item.categoryId}
                                    action={
                                        <IconButton aria-label="edit" value={item.id} onClick={handleEditClick}>
                                            <EditDocument />
                                        </IconButton>
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
            </HistoryListStyle>)
    }

    return (
        <HistoryLayout>
            <Panel>
                <PanelToolBar title="History">
                </PanelToolBar>
                {historyList()}
                {EditHistoryDialog({ open, closeDialog, dialogValues })};
            </Panel >
        </HistoryLayout>
    )
}