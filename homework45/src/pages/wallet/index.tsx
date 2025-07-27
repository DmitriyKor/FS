import { SideBar } from "@/shared/components/sideBar"
import { AccountArea } from "./components/account"
import { AddHistoryArea } from "./components/addHistory"
import { CategoriesArea } from "./components/categories"
import { HistoryArea } from "./components/history"
import { WalletGridLayout } from "./index.styles"
import { TopBar } from "../../shared/components/topBar"
import { PageInternalLayout, PageLayout, PageMainArea } from "../../shared/styles/styles"

const Wallet = () => {
    return (
        <PageLayout>
            <TopBar />
            <PageInternalLayout>
                <SideBar />
                <PageMainArea>
                    <WalletGridLayout>
                        <AccountArea />
                        <AddHistoryArea />
                        <CategoriesArea />
                        <HistoryArea />
                    </WalletGridLayout>
                </PageMainArea>
            </PageInternalLayout>
        </PageLayout>
    )
}

export default Wallet;