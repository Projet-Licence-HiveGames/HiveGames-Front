// frontend/src/App.tsx
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<Home/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
