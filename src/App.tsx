// frontend/src/App.tsx
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact.tsx";
import About from "./pages/About/About.tsx";

const App: React.FC = () => {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/About" element={<About/>}/>
                <Route path="/Contact" element={<Contact/>}/>
            </Route>
        </Routes>
    );
}

export default App;