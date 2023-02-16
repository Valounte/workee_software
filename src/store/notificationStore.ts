import { createSlice } from '@reduxjs/toolkit'
import { Config } from '../Config';

export const notification = createSlice({
    name: 'notification',
    initialState: {
      topic: Config.mercure.topic,
      url: Config.mercure.url,
      message: null,
      preferences: {
        TEMPERATURE: true,
        HUMIDITY: true,
        LUMINOSITY: true,
        SOUND: true
      }
    },
    reducers: {
      setTopic: (state, action) => {
        state.topic = action.payload;
      },
      setMessage: (state, action) => {
        state.message = action.payload;
      },
      setPreferences: (state, action) => {
        state.preferences[action.payload.metricType as keyof typeof state.preferences] = action.payload.enabled;
      }
    }
});

export const setTopic = notification.actions.setTopic;
export const setMessage = notification.actions.setMessage;
export const setPreferences = notification.actions.setPreferences;