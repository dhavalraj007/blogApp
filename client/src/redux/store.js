import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    userInfo: "",
  },
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
    storeUserInfo(state, payload) {
      state.userInfo = payload.payload;
    },
  },
});

export const authActions = authSlice.actions;
export const store = configureStore({
  reducer: authSlice.reducer,
});
