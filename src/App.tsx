import 'react-material-symbols/rounded';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import About from './pages/About/About.tsx';
import {Calendar} from './pages/Calendar/Calendar.tsx';
import {Catalogue} from './pages/Catalogue/Catalogue.tsx';
import Contact from './pages/Contact/Contact.tsx';
import {Friend} from './pages/Friend/Friend.tsx';
import {Game} from './pages/Game/Game.tsx';
import Home from './pages/Home/Home';
import {Library} from './pages/Library/Library.tsx';
import {Profil} from './pages/Profil/Profil.tsx';
import {Setting} from './pages/Setting/Setting.tsx';
import {Subscription} from './pages/Subscription/Subscription.tsx';
import {Wishlist} from './pages/Wishlist/Wishlist.tsx';
import Login from './pages/Login/Login.tsx';
import './App.css';
import {Checkout} from "./pages/Checkout/Checkout.tsx";
import {PaymentSuccess} from "./pages/PaymentSuccess/PaymentSuccess.tsx";
import {Cart} from "./pages/Cart/Cart.tsx";
import {PaymentFailed} from "./pages/PaymentFailed/PaymentFailed.tsx";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route index element={<Home/>}/>
                <Route path='Calendar' element={<Calendar/>}/>
                <Route path='Catalogue' element={<Catalogue/>}/>
                <Route path='Friend' element={<Friend/>}/>
                <Route path='Library' element={<Library/>}/>
                <Route path='Setting' element={<Setting/>}/>
                <Route path='Subscription' element={<Subscription/>}/>
                <Route path='Wishlist' element={<Wishlist/>}/>
                <Route path='About' element={<About/>}/>
                <Route path='Contact' element={<Contact/>}/>
                <Route path='Login' element={<Login/>}/>

                <Route path='Game' element={<Game/>}>
                    <Route path=':id' element={<Game/>}/>
                </Route>

                <Route path='Profil'>
                    <Route index element={<Profil/>}/>
                    <Route path=':id' element={<Home/>}/>
                </Route>

                <Route path='Cart'>
                    <Route index element={<Cart/>}/>
                    <Route path='Checkout' element={<Checkout/>}/>
                    <Route path='Payment-success' element={<PaymentSuccess/>}/>
                    <Route path='Payment-failed' element={<PaymentFailed/>}/>
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
