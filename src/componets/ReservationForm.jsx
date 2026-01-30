import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addReservation,
  updateReservation,
  fetchReservations,
} from "../features/reservations/reservationSlice";
import { fetchRooms } from "../features/rooms/roomSlice";
import "./Reservation.css";

const ReservationForm = ({ editData = null, onCancel }) => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.rooms);

  const [form, setForm] = useState({
    guestName: "",
    roomId: "",
    checkIn: "",
    checkOut: "",
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    dispatch(fetchRooms())
      .unwrap()
      .catch((err) => console.error("Failed to fetch rooms:", err))
      .finally(() => setLoading(false));
  }, [dispatch]);

  
  useEffect(() => {
    if (editData) {
      const room = rooms.find((r) => r.type === editData.roomType);
      setForm({
        guestName: editData.guestName,
        roomId: room ? room.id : "",
        checkIn: editData.checkIn,
        checkOut: editData.checkOut,
      });
    }
  }, [editData, rooms]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { guestName, roomId, checkIn, checkOut } = form;

    if (!guestName || !roomId || !checkIn || !checkOut) {
      alert("Please fill in all fields");
      return;
    }

    const room = rooms.find((r) => r.id === parseInt(roomId));
    if (!room) {
      alert("Selected room not found!");
      return;
    }

    const reservationData = {
      guestName,
      roomType: room.type,
      roomPrice: room.price,
      checkIn,
      checkOut,
    };

    if (editData) {
     
      dispatch(updateReservation({ id: editData.id, ...reservationData }));
      alert("Reservation updated successfully!");
      if (onCancel) onCancel(); 
    } else {
      
      dispatch(addReservation({ id: Date.now(), ...reservationData }));
      alert("Reservation added successfully!");
      setForm({ guestName: "", roomId: "", checkIn: "", checkOut: "" });
    }

    dispatch(fetchReservations());
  };

  return (
    <div className="reservation-container my-4">
      <h2 className="text-center mb-4">
        {editData ? "Edit Reservation" : "Make a Reservation"}
      </h2>

      <form className="reservation-card" onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Guest Name"
          name="guestName"
          value={form.guestName}
          onChange={handleChange}
          required
        />

        <select
          className="form-select mb-3"
          name="roomId"
          value={form.roomId}
          onChange={handleChange}
          disabled={loading || rooms.length === 0}
          required
        >
          <option value="">-- Select Room --</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>
              {r.type} - ₹{r.price}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="form-control mb-3"
          name="checkIn"
          value={form.checkIn}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          className="form-control mb-3"
          name="checkOut"
          value={form.checkOut}
          onChange={handleChange}
          required
        />

        <div className="d-flex gap-2">
          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={loading || rooms.length === 0}
          >
            {editData ? "Update Reservation" : loading ? "Loading Rooms..." : "Reserve"}
          </button>
          {editData && (
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
