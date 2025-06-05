/* eslint-disable prettier/prettier */
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import 'react-material-symbols/rounded';

import ProtectedRoute from './components/ProtectedRoute';
import { CartLayout } from './layouts/CartLayout.tsx';
import { MainLayout } from './layouts/MainLayout';
import { About } from './pages/About/About.tsx';
import { Calendar } from './pages/Calendar/Calendar.tsx';
import { Cart } from "./pages/Cart/Cart.tsx";
import { Catalog } from './pages/Catalog/Catalog.tsx';
import { Checkout } from "./pages/Checkout/Checkout.tsx";
import { Contact } from './pages/Contact/Contact.tsx';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.tsx';
import { Friend } from './pages/Friend/Friend.tsx';
import { GameInfo } from './pages/Game/GameInfo.tsx';
import { Home } from './pages/Home/Home';
import { Library } from './pages/Library/Library.tsx';
import { Login } from './pages/Login/Login.tsx';
import { PaymentFailed } from "./pages/PaymentFailed/PaymentFailed.tsx";
import { PaymentSuccess } from "./pages/PaymentSuccess/PaymentSuccess.tsx";
import { Profil } from './pages/Profil/Profil.tsx';
import { Register } from "./pages/Register/Register.tsx";
import { Setting } from './pages/Setting/Setting.tsx';
import { Subscription } from './pages/Subscription/Subscription.tsx';
import { Wishlist } from './pages/Wishlist/Wishlist.tsx';

import './App.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='calendar' element={<ProtectedRoute><Calendar/></ProtectedRoute>}/>
        <Route path='catalog' element={<Catalog/>}/>
        <Route path='friend' element={<ProtectedRoute><Friend/></ProtectedRoute>}/>
        <Route path='library' element={<ProtectedRoute><Library/></ProtectedRoute>}/>
        <Route path='setting' element={<ProtectedRoute><Setting/></ProtectedRoute>}/>
        <Route path='subscription' element={<ProtectedRoute><Subscription/></ProtectedRoute>}/>
        <Route path='whislist' element={<ProtectedRoute><Wishlist/></ProtectedRoute>}/>
        <Route path='about' element={<About/>}/>
        <Route path='contact' element={<Contact/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>

        <Route path='game' element={<GameInfo/>}>
          <Route path=':id' element={<GameInfo/>}/>
        </Route>

        <Route path='profil'>
          <Route index element={<ProtectedRoute><Profil/></ProtectedRoute>}/>
          <Route path=':id' element={<Home/>}/>
        </Route>

        <Route path='cart' element={<CartLayout/>}>
          <Route index element={<Cart />} />
          <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="order" element={<PaymentSuccess />} />
          <Route path="payment-failed" element={<PaymentFailed />} />
        </Route>
        <Route path='404' element={<ErrorPage/>}/>
      </Route>
      <Route path='*' element={<Home/>}/>
    </Routes>
  );
};

export default App;
