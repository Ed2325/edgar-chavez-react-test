import "./App.css";
import Login from "./screens/Login/Login";
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const isAuthenticated = false;

  return (
    <Router>
      <Routes>
        {/* Login page route */}
        <Route path='/login' element={<Login />} />

        {/* Redirect to either home or login based on authentication status */}
        <Route path='/' element={isAuthenticated ? <Navigate to='/' /> : <Navigate to='/login' />} />
        
        {/* Catch-all route to redirect to login if not authenticated */}
        <Route path='*' element={<Navigate to={isAuthenticated ? '/' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
