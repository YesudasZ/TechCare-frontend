import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosConfig";

const initialState = {
  technician: null,
  isLoading: false,
  error: null,
};

export const getTechnicianProfile = createAsyncThunk(
  "technician/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/technician/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTechnicianProfile = createAsyncThunk(
  "technician/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axios.put("/technician/update-profile", profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTechnicianPassword = createAsyncThunk(
  "technician/updatePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axios.put("/technician/update-password", passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTechnicianProfilePicture = createAsyncThunk(
  "technician/updateProfilePicture",
  async (imageData, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/technician/update-profile-picture", imageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const completeTechnicianProfile = createAsyncThunk(
  "technician/completeProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/technician/complete-profile", profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const technicianSlice = createSlice({
  name: "technician",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTechnicianProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTechnicianProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.technician = action.payload;
      })
      .addCase(getTechnicianProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateTechnicianProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTechnicianProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.technician = action.payload;
      })
      .addCase(updateTechnicianProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateTechnicianPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTechnicianPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTechnicianPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateTechnicianProfilePicture.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTechnicianProfilePicture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.technician.profilePicture = action.payload.profilePicture;
      })
      .addCase(updateTechnicianProfilePicture.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(completeTechnicianProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(completeTechnicianProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.technician = action.payload.user;
      })
      .addCase(completeTechnicianProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = technicianSlice.actions;
export default technicianSlice.reducer;
