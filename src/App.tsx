/* eslint-disable prettier/prettier */
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import 'react-material-symbols/rounded';

import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import About from './pages/About/About.tsx';
import { Calendar } from './pages/Calendar/Calendar.tsx';
import { Cart } from "./pages/Cart/Cart.tsx";
import { Catalog } from './pages/Catalog/Catalog.tsx';
import { Checkout } from "./pages/Checkout/Checkout.tsx";
import Contact from './pages/Contact/Contact.tsx';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.tsx';
import { Friend } from './pages/Friend/Friend.tsx';
import { GameInfo } from './pages/Game/GameInfo.tsx';
import Home from './pages/Home/Home';
import { Library } from './pages/Library/Library.tsx';
import Login from './pages/Login/Login.tsx';
import { PaymentFailed } from "./pages/PaymentFailed/PaymentFailed.tsx";
import { PaymentSuccess } from "./pages/PaymentSuccess/PaymentSuccess.tsx";
import { Profil } from './pages/Profil/Profil.tsx';
import Register from "./pages/Register/Register.tsx";
import { Setting } from './pages/Setting/Setting.tsx';
import { Subscription } from './pages/Subscription/Subscription.tsx';
import { Wishlist } from './pages/Wishlist/Wishlist.tsx';

import './App.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='Calendar' element={<ProtectedRoute><Calendar/></ProtectedRoute>}/>
        <Route path='Catalog' element={<Catalog/>}/>
        <Route path='Friend' element={<ProtectedRoute><Friend/></ProtectedRoute>}/>
        <Route path='Library' element={<ProtectedRoute><Library/></ProtectedRoute>}/>
        <Route path='Setting' element={<ProtectedRoute><Setting/></ProtectedRoute>}/>
        <Route path='Subscription' element={<ProtectedRoute><Subscription/></ProtectedRoute>}/>
        <Route path='Wishlist' element={<ProtectedRoute><Wishlist/></ProtectedRoute>}/>
        <Route path='About' element={<About/>}/>
        <Route path='Contact' element={<Contact/>}/>
        <Route path='Login' element={<Login/>}/>
        <Route path='Register' element={<Register/>}/>

        <Route path='Game' element={<GameInfo/>}>
          <Route path=':id' element={<GameInfo/>}/>
        </Route>

        <Route path='Profil'>
          <Route index element={<ProtectedRoute><Profil/></ProtectedRoute>}/>
          <Route path=':id' element={<Home/>}/>
        </Route>

        <Route path='Cart'>
          <Route index element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
          <Route path='Checkout' element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
          <Route path='Order' element={<ProtectedRoute><PaymentSuccess/></ProtectedRoute>}/>
          <Route path='Payment-success' element={<ProtectedRoute><PaymentFailed/></ProtectedRoute>}/>
        </Route>
        <Route path='404' element={<ErrorPage/>}/>
      </Route>
      <Route path='*' element={<Home/>}/>
    </Routes>
  );
};

export default App;
