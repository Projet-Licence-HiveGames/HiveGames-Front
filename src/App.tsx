import React from 'react';
import {Route, Routes} from 'react-router-dom';
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact.tsx";
import About from "./pages/About/About.tsx";
import {Catalogue} from "./pages/Catalogue/Catalogue.tsx";
import {Calendar} from "./pages/Calendar/Calendar.tsx";
import {Subscription} from "./pages/Subscription/Subscription.tsx";

const App: React.FC = () => {
    return (
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/Catalogue" element={<Catalogue/>}/>
                    <Route path="/Calendar" element={<Calendar/>}/>
                    <Route path="/Subscription" element={<Subscription/>}/>
                    <Route path="/About" element={<About/>}/>
                    <Route path="/Contact" element={<Contact/>}/>
                </Route>
            </Routes>
    );
}

export default App;