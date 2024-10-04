import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const saveSessionExpiry = (expiry: number | null) => {
  expiry
    ? localStorage.setItem("sessionExpiry", expiry.toString())
    : localStorage.removeItem("sessionExpiry");
};

const getSessionExpiry = (): number | null => {
  const expiry = localStorage.getItem("sessionExpiry");
  return expiry ? parseInt(expiry, 10) : null;
};

interface AuthState {
  isAuthenticated: boolean;
  sessionExpiry: number | null;
}

const initialState: AuthState = {
  isAuthenticated: !!getSessionExpiry(),
  sessionExpiry: getSessionExpiry(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      state.sessionExpiry = Date.now() + 5 * 60 * 1000;
      saveSessionExpiry(state.sessionExpiry);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.sessionExpiry = null;
      saveSessionExpiry(null);
    },
    extendSession: (state) => {
      state.sessionExpiry = Date.now() + 5 * 60 * 1000;
      saveSessionExpiry(state.sessionExpiry);
    },
  },
});

export const { login, logout, extendSession } = authSlice.actions;
export default authSlice.reducer;

export const selectIsSessionValid = (state: RootState) => {
  const { isAuthenticated, sessionExpiry } = state.auth;
  return isAuthenticated && sessionExpiry && sessionExpiry > Date.now();
};
