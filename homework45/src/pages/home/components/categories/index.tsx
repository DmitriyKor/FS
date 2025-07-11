import { useSelector } from 'react-redux';

import { Panel, PanelToolBar, PanelToolBarButton } from "@/shared/components/panel";
import type { ICategories } from "@/store/category";
import { CategoriesLayout, CategoriesListStyle, CategoryItemStyle } from "./index.styles"

export const CategoriesArea: React.FC = () => {
    const categories: ICategories = useSelector(state => state.categories);

    console.log('CategoriesArea:');
    console.log(categories);

    return (
        <CategoriesLayout>
            <Panel>
                <PanelToolBar title="Categories">
                    <PanelToolBarButton text="+" />
                </PanelToolBar>
                <CategoriesListStyle>
                    {categories.items?.map((item) => {
                        return (
                            <CategoryItemStyle key={item.id + item.name}>
                                <h5>{item.name}</h5>
                            </CategoryItemStyle>
                        )
                    })}
                </CategoriesListStyle>
            </Panel>
        </CategoriesLayout>
    )
}