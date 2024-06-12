import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface NotificationState {
  notifications: string[];
}

const initialState: NotificationState = {
  notifications: [],
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { dispatch }) => {
    // Simulate an API call
    const response = await new Promise<{ data: string[] }>((resolve) =>
      setTimeout(() => resolve({ data: ['Notification 1', 'Notification 2'] }), 1000)
    );
    return response.data;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<string>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });
  },
});

export const { addNotification, removeNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
