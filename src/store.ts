import { configureStore, createSlice } from '@reduxjs/toolkit'

const wifi = createSlice({
  name: 'wifi',
  initialState: {
    ssid: '',
    connected: false
  },
  reducers: {
    setWifi: (state, action) => {
      state.ssid = action.payload.ssid
      state.connected = action.payload.connected;
    }
  }
});

export const setWifi = wifi.actions.setWifi;

export const store = configureStore({
  reducer: {
    wifi: wifi.reducer
  }
});