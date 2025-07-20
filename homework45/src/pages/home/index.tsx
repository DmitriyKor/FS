import { SideBar } from "../../shared/components/sideBar"
import { TopBar } from "../../shared/components/topBar"
import { PageInternalLayout, PageLayout, PageMainArea } from "../../shared/styles/styles"

export const Home = () => {
    return (
        <PageLayout>
            <TopBar />
            <PageInternalLayout>
                <SideBar />
                <PageMainArea>

                    <div>
                        <h2>News</h2>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ad non cum sequi exercitationem dignissimos odit assumenda asperiores iste repellat iusto quidem dolores et dicta a adipisci mollitia, ipsa id harum nam. Magnam eaque sequi consequuntur quas alias nesciunt et in non, cumque cupiditate quibusdam sint unde officia explicabo nisi!</p>
                    </div>
                </PageMainArea>
            </PageInternalLayout>
        </PageLayout>
    )
}