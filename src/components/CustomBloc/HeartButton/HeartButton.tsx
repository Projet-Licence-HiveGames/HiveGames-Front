import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './HeartButton.css';

export const HeartButton: React.FC<{ isFavorite: boolean, onClick: () => void }> = ({ isFavorite, onClick }) => {
    return (
        <div className='heart-button-container'>
            <button className='heart-button' onClick={onClick}>
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </button>
        </div>
    );
};
