import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/apiInstance.js";


export const fetchReservations = createAsyncThunk(
  "reservations/fetch",
  async () => {
    const res = await api.get("/reservations");
    return res.data;
  }
);


export const addReservation = createAsyncThunk(
  "reservations/add",
  async (data) => {
    const res = await api.post("/reservations", data);
    return res.data;
  }
);

export const updateReservation = createAsyncThunk(
  "reservations/update",
  async (reservation) => {
    const res = await api.patch(`/reservations/${reservation.id}`, reservation);
    return res.data;
  }
);


export const deleteReservation = createAsyncThunk(
  "reservations/delete",
  async (id) => {
    await api.delete(`/reservations/${id}`);
    return id;
  }
);

const reservationSlice = createSlice({
  name: "reservations",
  initialState: { reservations: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.reservations = action.payload;
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
