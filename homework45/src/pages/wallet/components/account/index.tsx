import { Panel } from "../../../../shared/components/panel"
import { PanelToolBarStyle, PanelToolBarText } from "../../../../shared/styles/styles"
import { AccountLayout } from "./index.styles"

export const AccountArea = ()=> {
    return (
        <AccountLayout>
            <Panel>
                <PanelToolBarStyle>
                    <PanelToolBarText>Account</PanelToolBarText>
                </PanelToolBarStyle>
            </Panel>
        </AccountLayout>
    )
}