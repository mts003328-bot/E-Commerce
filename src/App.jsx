import { Routes, Route, Navigate } from "react-router-dom";

import Profile from "./pages/Profile";
import LoginForm from "./pages/LoginForm";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (<Routes>
        <Route
            path="/"
            element={<Navigate to="/login" replace />}
        />

        ```
        <Route
            path="/login"
            element={<LoginForm />}
        />

        <Route
            path="/products"
            element={<Products />}
        />

        <Route
            path="/profile"
            element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            }
        />

        <Route
            path="/cart"
            element={
                <ProtectedRoute>
                    <Cart />
                </ProtectedRoute>
            }
        />

        <Route
            path="/checkout"
            element={
                <ProtectedRoute>
                    <Checkout />
                </ProtectedRoute>
            }
        />

        <Route
            path="/order-success"
            element={
                <ProtectedRoute>
                    <OrderSuccess />
                </ProtectedRoute>
            }
        />

        <Route
            path="/products/add"
            element={
                <ProtectedRoute>
                    <AddProduct />
                </ProtectedRoute>
            }
        />

        <Route
            path="/products/:id"
            element={
                <ProtectedRoute>
                    <ProductDetails />
                </ProtectedRoute>
            }
        />
    </Routes>
    );

}

export default App;
