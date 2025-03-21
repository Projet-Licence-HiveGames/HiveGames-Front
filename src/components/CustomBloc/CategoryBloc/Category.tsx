import React from 'react';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import './Category.css';

interface CategoryProps {
    category: string[];
}

const Category: React.FC<CategoryProps> = ({category=['test']}) => {
    const [showAll, setShowAll] = React.useState(false);



    return (
        <div className={'category-bloc'}>
            {category.slice(0,showAll ? -1 : 3).map((category, index) => {
                return (
                    <div key={index} className={'category-bloc-category'}>
                        <span>{category}</span>
                    </div>
                )
            })}
            {!showAll && <div
                className={'category-bloc-category-more'}
                onClick={() => setShowAll(true)}>
                <MoreHorizRoundedIcon/>
            </div>}
        </div>
    );
}

export default Category;