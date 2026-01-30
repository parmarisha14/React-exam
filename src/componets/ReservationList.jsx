import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReservations,
  deleteReservation,
} from "../features/reservations/reservationSlice";
import ReservationForm from "./ReservationForm";
import "./Reservation.css";

const ReservationList = () => {
  const dispatch = useDispatch();
  const { reservations } = useSelector((state) => state.reservations);

  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div className="reservation-container my-4">
      {editData ? (
        <ReservationForm
          editData={editData}
          onCancel={() => setEditData(null)}
        />
      ) : (
        <>
          <h2 className="text-center mb-4">Reservations</h2>
          <table className="table reservation-table text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Guest Name</th>
                <th>Room Type</th>
                <th>Price</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 && (
                <tr>
                  <td colSpan="7">No reservations</td>
                </tr>
              )}
              {reservations.map((res,index) => (
                <tr key={res.id}>
                  <td>{index + 1}</td>
                  <td>{res.guestName}</td>
                  <td>{res.roomType}</td>
                  <td>₹{res.roomPrice}</td>
                  <td>{res.checkIn}</td>
                  <td>{res.checkOut}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={() => setEditData(res)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch(deleteReservation(res.id))}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ReservationList;
