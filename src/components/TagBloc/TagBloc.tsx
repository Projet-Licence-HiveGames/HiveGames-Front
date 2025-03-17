import React from 'react';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import './TagBloc.css';

interface TagBlocProps {
    tag: string[];
}

const TagBloc: React.FC<TagBlocProps> = ({tag}) => {
    const tagMap = tag.map((tag) => {
        return (
            <div className={'tag-bloc-tag'}>
                <span>{tag}</span>
            </div>)
    });

    return (
        <div className={'tag-bloc'}>
            {tagMap}
            <div className={'tag-bloc-tag-more'}>
                <MoreHorizRoundedIcon/>
            </div>
        </div>
    );
}

export default TagBloc;