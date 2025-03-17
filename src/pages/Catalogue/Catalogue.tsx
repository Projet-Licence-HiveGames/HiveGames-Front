import React from 'react';
import './Catalogue.css';
import RectangleCard from "../../components/RectangleCard/RectangleCard.tsx";

export const Catalogue: React.FC = () => {
  return (
    <div>
      <h1>Catalogue</h1>
      <RectangleCard title={'Product 1'} />
    </div>
  );
};
