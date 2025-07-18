import { SideBar } from "@/shared/components/sideBar"
import { AccountArea } from "./components/account"
import { AddHistoryArea } from "./components/addHistory"
import { CategoriesArea } from "./components/categories"
import { HistoryArea } from "./components/history"
import { HomeAreaStyle, HomeGridLayout, HomeLayout } from "./index.styles"
import { TopBar } from "../../shared/components/topBar"

export const Home = () => {
    return (
        <>
            <HomeLayout>
                <SideBar />
                <HomeAreaStyle>
                    <TopBar />
                    <HomeGridLayout>
                        <AccountArea />
                        <AddHistoryArea />
                        <CategoriesArea />
                        <HistoryArea />
                    </HomeGridLayout>
                </HomeAreaStyle>
            </HomeLayout>
        </>
    )
}