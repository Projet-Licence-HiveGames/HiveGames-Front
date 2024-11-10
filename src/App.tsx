// frontend/src/App.tsx
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";

const App: React.FC = () => {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<Home/>}/>
            </Route>
        </Routes>
    );
}

export default App;