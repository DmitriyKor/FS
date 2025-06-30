import { SideBar } from "../../components/sideBar"
import { HomeGridLayout, HomeLayout } from "./index.styles"

export const Home = ()=>{
    return (
        <HomeLayout>
            <SideBar/>
            <HomeGridLayout>
                <div>account</div>
                <div>category</div>
                <div>history</div>
                <div>add category</div>
            </HomeGridLayout>
        </HomeLayout>
    )
}