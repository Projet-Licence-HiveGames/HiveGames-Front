import React from "react";
import "./GameDescription.css";

interface ImageType {
    file_name: string;
}

interface GameDescriptionProps {
    description: string;
    image: ImageType[];
}

export const GameDescription: React.FC<GameDescriptionProps> = ({ description, image }) => {
    return (
        <div className="game-description-container">
            <div className="game-images">
                <img src={image[0]?.file_name} alt="game" />
            </div>
            <div className="game-description">
                <p>{description}</p>
            </div>
        </div>
    );
}; 