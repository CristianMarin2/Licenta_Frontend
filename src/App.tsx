import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { SessionProvider } from './contexts/SessionContext';
import { SelfCheckoutProvider } from './contexts/SelfCheckoutContext';

import ProtectedRoute from './components/Routes/ProtectedRoute';
import AdminRoute from './components/Routes/AdminRoute';

import LoginPage from './pages/LoginPage/LoginPage';
import ScanPage from './pages/ScanPage/ScanPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import StartSessionPage from './pages/StartSessionPage/StartSessionPage';
import EndSessionPage from './pages/EndSessionPage/EndSessionPage';

import SelfScanPage from './pages/SelfScanPage/SelfScanPage';
import SelfCheckoutPage from './pages/SelfCheckoutPage/SelfCheckoutPage';

import AdminPage from './pages/AdminPage/AdminPage';
import AdminUsersPage from './pages/AdminUsersPage/AdminUsersPage';
import AdminProductsActivePage from './pages/AdminProductsActive/AdminProductsActivePage';
import AdminProductsInactivePage from './pages/AdminProductsInactive/AdminProductsInactivePage';

const App = () => {
  return (
    <SelfCheckoutProvider>
      <AuthProvider>
        <SessionProvider>
          <CartProvider>
            <Routes>
              {/* Modul clasic */}
              <Route path="/" element={<LoginPage />} />
              <Route path="/scan" element={<ProtectedRoute><ScanPage /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
              <Route path="/start-session" element={<ProtectedRoute><StartSessionPage /></ProtectedRoute>} />
              <Route path="/end-session" element={<ProtectedRoute><EndSessionPage /></ProtectedRoute>} />

              {/* Admin */}
              <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><AdminUsersPage /></AdminRoute>} />
              <Route path="/admin/products/active" element={<AdminRoute><AdminProductsActivePage /></AdminRoute>} />
              <Route path="/admin/products/inactive" element={<AdminRoute><AdminProductsInactivePage /></AdminRoute>} />

              {/* Modul SelfCheckout */}
              <Route path="/self/scan" element={<ProtectedRoute><SelfScanPage /></ProtectedRoute>} />
              <Route path="/self/checkout" element={<ProtectedRoute><SelfCheckoutPage /></ProtectedRoute>} />
            </Routes>
          </CartProvider>
        </SessionProvider>
      </AuthProvider>
    </SelfCheckoutProvider>
  );
};

export default App;
