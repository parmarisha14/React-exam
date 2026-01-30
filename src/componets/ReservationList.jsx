import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations, deleteReservation } from "../features/reservations/reservationSlice.js";
import ReservationForm from "./ReservationForm.jsx";
import "./Reservation.css";

const ReservationList = () => {
  const dispatch = useDispatch();
  const { reservations } = useSelector((state) => state.reservations);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm("Cancel this reservation?")) return;
    dispatch(deleteReservation(id));
  };

  return (
    <div className="reservation-container">
      {editData ? (
        <ReservationForm editData={editData} onCancel={() => setEditData(null)} />
      ) : (
        <>
          <h2 className="form-title">Reservations</h2>
          <div className="reservation-table-container">
            <table className="reservation-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Guest Name</th>
                  <th>Room Type</th>
                  <th>Price</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.length === 0 ? (
                  <tr><td colSpan="7">No reservations</td></tr>
                ) : (
                  reservations.map((res, i) => (
                    <tr key={res.id}>
                      <td>{i + 1}</td>
                      <td>{res.guestName}</td>
                      <td>{res.roomType}</td>
                      <td>₹{res.roomPrice}</td>
                      <td>{res.checkIn}</td>
                      <td>{res.checkOut}</td>
                      <td>
                        <button className="btn-edit" onClick={() => setEditData(res)}>Edit</button>
                        <button className="btn-delete" onClick={() => handleDelete(res.id)}>Cancel</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ReservationList;
