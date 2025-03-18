import React from 'react';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import './Category.css';

interface CategoryProps {
    category: string[];
}

const Category: React.FC<CategoryProps> = ({category=['test']}) => {


    return (
        <div className={'category-bloc'}>
            {category.map((category, index) => {
                return (
                    <div key={index} className={'category-bloc-category'}>
                        <span>{category}</span>
                    </div>
                )
            })}
            <div className={'category-bloc-category-more'}>
                <MoreHorizRoundedIcon/>
            </div>
        </div>
    );
}

export default Category;