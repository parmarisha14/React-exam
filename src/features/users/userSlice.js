import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/apiInstance.js"; // Axios instance

// Async login
export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users?email=${email}&password=${password}`);
      if (res.data.length > 0) {
        return res.data[0]; // return user object
      } else {
        return rejectWithValue("Invalid email or password");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,       // currently logged-in user
    loading: false,   // request in progress
    error: null,      // error message
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
