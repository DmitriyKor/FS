import type { ICategories } from "../../../../store/category";
import { CategoriesLayout } from "./index.styles"
import { useSelector } from 'react-redux';

export const CategoriesArea : React.FC= ()=> {
    const categories : ICategories = useSelector(state => state.categories);

    console.log('CategoriesArea:');
    console.log(categories);

    return (
        <CategoriesLayout>
            {categories.items?.map((item)=>{
                return (
                    <div key={item.id+item.name}>
                        <h4>{item.name}</h4>
                    </div>
                )
            })}
        </CategoriesLayout>
    )
}