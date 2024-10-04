import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  if (isAuthenticated) {
    console.log("you are authetincated");
  } else {
    console.log("you are not authenticated");
  }

  return isAuthenticated ? element : <Navigate to='/login' />;
};

export default PrivateRoute;
