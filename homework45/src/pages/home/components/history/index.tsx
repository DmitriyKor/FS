import { useSelector } from "react-redux";
import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { EditDocument } from '@mui/icons-material';

import { Panel, PanelToolBar } from "@/shared/components/panel"
import type { IHistory } from "@/store/history";
import { HistoryItemStyle, HistoryLayout, HistoryListStyle } from "./index.styles"


export const HistoryArea = () => {
    const history: IHistory = useSelector(state => state.history);

    const handleEditClick = (e)=> {
        console.log(e.currentTarget.value);
    }

    return (
        <HistoryLayout>
            <Panel>
                <PanelToolBar title="History">
                </PanelToolBar>
                <HistoryListStyle>
                    {history.items?.toReversed().map(
                        (item) => {
                            return (
                                <Card sx={{ m: 0.5 }} key={item.id+item.comment}>
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
                                            {item.income>0? item.income: item.expense}
                                        </Typography>
                                    </CardContent>
                
                                </Card>
                            )
                        }
                    )}

                </HistoryListStyle >

            </Panel >
        </HistoryLayout>
    )
}