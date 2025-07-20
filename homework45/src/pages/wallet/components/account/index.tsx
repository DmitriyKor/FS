import { Panel, PanelToolBar} from "@/shared/components/panel"

import { AccountLayout } from "./index.styles"

export const AccountArea = ()=> {
    return (
        <AccountLayout>
            <Panel>
                <PanelToolBar title="Account">
                </PanelToolBar>
            </Panel>
        </AccountLayout>
    )
}