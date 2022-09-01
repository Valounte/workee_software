import { createSlice } from '@reduxjs/toolkit'

export const notification = createSlice({
    name: 'notification',
    initialState: {
      topic: "https://mercure.brangers.eu/notification",
      url: "https://mercure.brangers.eu/.well-known/mercure",
      message: ''
    },
    reducers: {
      setTopic: (state, action) => {
        state.topic = action.payload;
      },
      setMessage: (state, action) => {
        state.message = action.payload;
      }
    }
});

export const setTopic = notification.actions.setTopic;