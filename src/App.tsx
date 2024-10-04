import "./App.css";
import Login from "./screens/Login/Login";
import Products from "./screens/Products/Products"; 
import NotFound from "./screens/NotFound/NotFound";
import ProductDetail from "./screens/ProductDetails/ProductDetails";
import CreateProduct from "./screens/CreateProduct/CreateProduct";
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { logout, extendSession } from "./slices/authSlice";

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const sessionExpiry = useSelector((state: RootState) => state.auth.sessionExpiry);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && sessionExpiry) {
      const remainingTime = sessionExpiry - Date.now();

      const timeoutId = setTimeout(() => {
        dispatch(logout()); 
      }, remainingTime);

      return () => clearTimeout(timeoutId); 
    }
  }, [isAuthenticated, sessionExpiry, dispatch]);

  useEffect(() => {
    const handleUserActivity = () => {
      if (isAuthenticated) {
        dispatch(extendSession());
      }
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [isAuthenticated, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={isAuthenticated ? <Products /> : <Navigate to='/login' />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/createProduct" element={<CreateProduct/>} />
        <Route path="/404" element={<NotFound />} /> 
        <Route path='*' element={<Navigate to={isAuthenticated ? '/' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
