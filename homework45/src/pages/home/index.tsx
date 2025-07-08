import { SideBar } from "@/shared/components/sideBar"
import { AccountArea } from "./components/account"
import { AddHistoryArea } from "./components/addHistory"
import { CategoriesArea } from "./components/categories"
import { HistoryArea } from "./components/history"
import { HomeGridLayout, HomeLayout } from "./index.styles"

export const Home = ()=>{
    return (
        <HomeLayout>
            <SideBar/>
            <HomeGridLayout>
                <AccountArea/>
                <AddHistoryArea/>
                <CategoriesArea/>
                <HistoryArea/>
            </HomeGridLayout>
        </HomeLayout>
    )
}