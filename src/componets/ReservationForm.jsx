import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addReservation, updateReservation } from "../features/reservations/reservationSlice.js";
import "./Reservation.css";

const ReservationForm = ({ editData, onCancel }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    guestName: "",
    roomType: "",
    roomPrice: "",
    checkIn: "",
    checkOut: "",
  });

  useEffect(() => {
    if (editData) setForm({ ...editData });
  }, [editData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      dispatch(updateReservation(form));
      if (onCancel) onCancel();
    } else {
      dispatch(addReservation(form));
      setForm({
        guestName: "",
        roomType: "",
        roomPrice: "",
        checkIn: "",
        checkOut: "",
      });
    }
  };

  return (
    <div className="reservation-container">
      <div className="reservation-card">
        <h2 className="form-title">{form.id ? "Edit Reservation" : "Add Reservation"}</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>Guest Name</label>
            <input
              type="text"
              name="guestName"
              value={form.guestName}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter guest name"
              required
            />
          </div>

          <div className="form-group">
            <label>Room Type</label>
            <input
              type="text"
              name="roomType"
              value={form.roomType}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter room type"
              required
            />
          </div>

          <div className="form-group">
            <label>Room Price</label>
            <input
              type="number"
              name="roomPrice"
              value={form.roomPrice}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter room price"
              required
            />
          </div>

          <div className="form-group">
            <label>Check-In Date</label>
            <input
              type="date"
              name="checkIn"
              value={form.checkIn}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Check-Out Date</label>
            <input
              type="date"
              name="checkOut"
              value={form.checkOut}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              {form.id ? "Update" : "Save"}
            </button>
            {form.id && (
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
