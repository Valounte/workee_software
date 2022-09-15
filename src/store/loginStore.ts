import { createSlice } from '@reduxjs/toolkit';

export const login = createSlice({
    name: "login",
    initialState: {
        email: '',
        password: '',
    },
    reducers: {
      setEmail: (state, action) => {
        state.email = action.payload;
      },
      setPassword: (state, action) => {    
        state.password = action.payload;
      },
    }
  });

export const setEmail = login.actions.setEmail;
export const setPassword = login.actions.setPassword;

