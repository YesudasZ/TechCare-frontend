import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosConfig";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/notifications");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markNotificationAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/auth/notifications/${notificationId}/read`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearAllNotifications = createAsyncThunk(
  "notifications/clearAllNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/auth/notifications");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeNotification = createAsyncThunk(
  "notifications/removeNotification",
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/auth/notifications/${notificationId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    addNotification: (state, action) => {
      state.items.unshift(action.payload);
      state.unreadCount += 1;
    },
    removeNotification: (state, action) => {
      state.items = state.items.filter(
        (notification) => notification._id !== action.payload
      );
      state.unreadCount -= 1;
    },
    clearNotification: (state) => {
      state.items = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.read).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (n) => n._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index].read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(clearAllNotifications.fulfilled, (state) => {
        state.items = [];
        state.unreadCount = 0;
      })
      .addCase(removeNotification.fulfilled, (state, action) => {
        state.items = state.items.filter((n) => n._id !== action.payload._id);
        if (!action.payload.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      });
  },
});

export const { addNotification, clearNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
