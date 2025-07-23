import { Button, Typography } from "@mui/material"
import { SideBar } from "../../shared/components/sideBar"
import { TopBar } from "../../shared/components/topBar"
import { PageInternalLayout, PageLayout, PageMainArea } from "../../shared/styles/styles"
import { NavLink } from "react-router-dom"

export const Home = () => {
    return (
        <PageLayout>
            <TopBar />
            <PageInternalLayout>
                <SideBar />
                <PageMainArea>

                    <div>
                        <Typography variant="h2" gutterBottom>E-Wallet</Typography>
                        <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ad non cum sequi exercitationem dignissimos odit assumenda asperiores iste repellat iusto quidem dolores et dicta a adipisci mollitia, ipsa id harum nam. Magnam eaque sequi consequuntur quas alias nesciunt et in non, cumque cupiditate quibusdam sint unde officia explicabo nisi!</Typography>
                        <Button sx={{mt:2}} variant="outlined"
                        component={NavLink}
                        to="/register"
                        >GET STARTED</Button>
                    </div>
                </PageMainArea>
            </PageInternalLayout>
        </PageLayout>
    )
}