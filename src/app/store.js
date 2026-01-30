import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "../features/rooms/roomSlice";
import reservationReducer from "../features/reservations/reservationSlice";
// import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    reservations: reservationReducer,
    // users: userReducer
  }
});
