import { useDispatch, useSelector } from 'react-redux';

import { Panel, PanelToolBar, PanelToolBarButton } from "@/shared/components/panel";
import type { ICategories } from "@/store/category";
import { CategoriesLayout, CategoriesListStyle, CategoryItemStyle } from "./index.styles"
import { updateCategoriesBalance } from '../../../../store/category';
import type { IHistory } from '../../../../store/history';

export const CategoriesArea: React.FC = () => {
   
    const categories: ICategories = useSelector(state => state.categories);
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
                                <p>{item.description}</p>
                                <p>Income: {item.balanceIncome}</p>
                                <p>Expense: {item.balanceExpense}</p>
                            </CategoryItemStyle>
                        )
                    })}
                </CategoriesListStyle>
            </Panel>
        </CategoriesLayout>
    )
}