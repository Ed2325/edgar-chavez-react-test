import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { logout, extendSession, selectIsSessionValid } from "./slices/authSlice";
import Login from "./screens/Login/Login";
import Products from "./screens/Products/Products";
import NotFound from "./screens/NotFound/NotFound";
import ProductDetail from "./screens/ProductDetails/ProductDetails";
import CreateProduct from "./screens/CreateProduct/CreateProduct";
import PrivateRoute from "./PrivateRoute";

function App() {
  const isSessionValid = useSelector((state: RootState) => selectIsSessionValid(state));
  const sessionExpiry = useSelector((state: RootState) => state.auth.sessionExpiry);
  const dispatch = useDispatch();

  // Session timeout logic
  useEffect(() => {
    if (isSessionValid && sessionExpiry) {
      const remainingTime = sessionExpiry - Date.now();
      const timeoutId = setTimeout(() => dispatch(logout()), remainingTime);

      return () => clearTimeout(timeoutId);
    }
  }, [isSessionValid, sessionExpiry, dispatch]);

  // Extend session on user activity
  useEffect(() => {
    const resetSessionTimer = () => isSessionValid && dispatch(extendSession());
    window.addEventListener("mousemove", resetSessionTimer);
    window.addEventListener("keydown", resetSessionTimer);

    return () => {
      window.removeEventListener("mousemove", resetSessionTimer);
      window.removeEventListener("keydown", resetSessionTimer);
    };
  }, [isSessionValid, dispatch]);

  return (
    <Router>
      <Routes>x
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/404' element={<NotFound />} />

        {/* Protected Routes */}
        <Route path='/' element={<PrivateRoute element={<Products />} />} />
        <Route path='/products/:id' element={<PrivateRoute element={<ProductDetail />} />} />
        <Route path='/createProduct' element={<PrivateRoute element={<CreateProduct />} />} />

        <Route path='*' element={<Navigate to={isSessionValid ? '/' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
