import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      console.log("Action from AuthSlice:Payload:", action);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
    getUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, logOut, getUser } = authSlice.actions;
export default authSlice.reducer;

export const userCurrentToken = (state) => state.auth.token;
export const usertCurrentUser = (state) => state.auth.user;
