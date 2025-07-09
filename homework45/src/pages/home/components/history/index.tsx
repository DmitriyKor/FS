import { useSelector } from "react-redux";

import { Panel, PanelToolBar } from "@/shared/components/panel"
import type { IHistory } from "@/store/history";
import { HistoryItemStyle, HistoryLayout, HistoryListStyle } from "./index.styles"

export const HistoryArea = () => {
    const history: IHistory = useSelector(state => state.history);
    return (
        <HistoryLayout>
            <Panel>
                <PanelToolBar title="History">
                </PanelToolBar>
                <HistoryListStyle>
                    {history.items?.toReversed().map(
                        (item) => {
                            return (
                                <HistoryItemStyle key={item.id + item.name}>
                                    <h5>{item.comment}</h5>
                                    <p>Category id: {item.id}</p>
                                    <p>Income: {item.income}</p>
                                    <p>Expense: {item.expense}</p>
                                </HistoryItemStyle>
                            )
                        }
                    )
                    }
                </HistoryListStyle>

            </Panel>
        </HistoryLayout>
    )
}