import { configureStore, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit'
import { notification } from './store/notificationStore';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})
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



const keyboard = createSlice({
  name: 'keyboard',
  initialState: {
    keyboardActivate: false,
    props: {}
  },
  reducers: {
    setKeyboard: (state, action) => {
      state.props = action.payload.props;
      state.keyboardActivate = action.payload.keyboard;
    },
  }
});

export const setWifi = wifi.actions.setWifi;
export const keyboardF = {
  setKeyboard: keyboard.actions.setKeyboard
};

export const store = configureStore({
  middleware: customizedMiddleware,
  reducer: {
    wifi: wifi.reducer,
    keyboard: keyboard.reducer,
    notification: notification.reducer
  }
});