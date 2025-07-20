import { SideBar } from "@/shared/components/sideBar"
import { AccountArea } from "./components/account"
import { AddHistoryArea } from "./components/addHistory"
import { CategoriesArea } from "./components/categories"
import { HistoryArea } from "./components/history"
import { HomeGridLayout } from "./index.styles"
import { TopBar } from "../../shared/components/topBar"
import { PageInternalLayout, PageLayout, PageMainArea } from "../../shared/styles/styles"

export const Wallet = () => {
    return (
        <PageLayout>
            <TopBar />
            <PageInternalLayout>
                <SideBar />
                <PageMainArea>
                    <HomeGridLayout>
                        <AccountArea />
                        <AddHistoryArea />
                        <CategoriesArea />
                        <HistoryArea />
                    </HomeGridLayout>
                </PageMainArea>
            </PageInternalLayout>
        </PageLayout>
    )
}