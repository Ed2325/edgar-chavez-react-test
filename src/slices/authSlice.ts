import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  sessionExpiry: number | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  sessionExpiry: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      state.sessionExpiry = Date.now() + 5 * 60 * 1000;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.sessionExpiry = null;
    },
    extendSession: (state) => {
      if (state.isAuthenticated) {
        state.sessionExpiry = Date.now() + 5 * 60 * 1000;
      }
    },
  },
});

export const { login, logout, extendSession } = authSlice.actions;
export default authSlice.reducer;
