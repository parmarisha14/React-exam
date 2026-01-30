import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/reservations";


export const fetchReservations = createAsyncThunk(
  "reservations/fetch",
  async () => {
    const res = await axios.get(API_URL);
    return res.data;
  }
);


export const addReservation = createAsyncThunk(
  "reservations/add",
  async (reservation) => {
    const res = await axios.post(API_URL, reservation);
    return res.data;
  }
);

export const updateReservation = createAsyncThunk(
  "reservations/update",
  async ({ id, data }) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  }
);


export const deleteReservation = createAsyncThunk(
  "reservations/delete",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const reservationSlice = createSlice({
  name: "reservations",
  initialState: {
    reservations: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => { state.loading = true; })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addReservation.fulfilled, (state, action) => {
        state.reservations.push(action.payload);
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        const index = state.reservations.findIndex(r => r.id === action.payload.id);
        if (index !== -1) state.reservations[index] = action.payload;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.reservations = state.reservations.filter(r => r.id !== action.payload);
      });
  },
});

export default reservationSlice.reducer;
