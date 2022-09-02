import { createSlice } from '@reduxjs/toolkit'
import { Config } from '../Config';

export const notification = createSlice({
    name: 'notification',
    initialState: {
      topic: Config.mercure.topic,
      url: Config.mercure.url,
      message: null,
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
export const setMessage = notification.actions.setMessage;