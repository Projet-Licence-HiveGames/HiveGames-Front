/* eslint-disable prettier/prettier */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

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
      <Route element={<MainLayout/>} path='/'>
        <Route element={<Home/>} index/>
        <Route element={<ProtectedRoute><Calendar/></ProtectedRoute>} path='calendar'/>
        <Route element={<Catalog/>} path='catalog'/>
        <Route element={<ProtectedRoute><Friend/></ProtectedRoute>} path='friend'/>
        <Route element={<ProtectedRoute><Library/></ProtectedRoute>} path='library'/>
        <Route element={<ProtectedRoute><Setting/></ProtectedRoute>} path='setting'/>
        <Route element={<ProtectedRoute><Subscription/></ProtectedRoute>} path='subscription'/>
        <Route element={<ProtectedRoute><Wishlist/></ProtectedRoute>} path='whislist'/>
        <Route element={<About/>} path='about'/>
        <Route element={<Contact/>} path='contact'/>
        <Route element={<Login/>} path='login'/>
        <Route element={<Register/>} path='register'/>

        <Route element={<GameInfo/>} path='game'>
          <Route element={<GameInfo/>} path=':id'/>
        </Route>

        <Route path='profil'>
          <Route element={<ProtectedRoute><Profil/></ProtectedRoute>} index/>
          <Route element={<Home/>} path=':id'/>
        </Route>

        <Route element={<CartLayout/>} path='cart'>
          <Route element={<Cart />} index />
          <Route element={<ProtectedRoute><Checkout /></ProtectedRoute>} path="checkout" />
          <Route element={<PaymentSuccess />} path="order" />
          <Route element={<PaymentFailed />} path="payment-failed" />
        </Route>
        <Route element={<ErrorPage/>} path='404'/>
      </Route>
      <Route element={<Navigate replace to='/' />} path='*' />
    </Routes>
  );
};

export default App;
