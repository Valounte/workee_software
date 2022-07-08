import { configureStore, createSlice } from '@reduxjs/toolkit'

const wifi = createSlice({
  name: 'wifi',
  initialState: {
    ssid: '',
    connected: true
  },
  reducers: {
    setWifi: (state, action) => {
      state.ssid = action.payload.ssid
      state.connected = action.payload.connected;
    }
  }
});

export const store = configureStore({
  reducer: {
    wifi: wifi.reducer
  }
});