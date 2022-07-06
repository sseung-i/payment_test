import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Payment from './pages/Payment/Payment';
import PaymentResult from './pages/PaymentResult/PaymentResult';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="/payment/result" element={<PaymentResult />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
