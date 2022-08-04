import { configureStore, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Url } from 'url';

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

const notification = createSlice({
  name: 'notification',
  initialState: {
    urlList: ["https://mercure.brangers.eu/notification"],
    urlMercure: "https://mercure.brangers.eu/.well-known/mercure"
  },
  reducers: {
    addUrlList: (state, action) => {
      state.urlList.push(action.payload);
    },
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
export const addUrlList = notification.actions.addUrlList;

export const store = configureStore({
  middleware: customizedMiddleware,
  reducer: {
    wifi: wifi.reducer,
    keyboard: keyboard.reducer,
    notification: notification.reducer
  }
});