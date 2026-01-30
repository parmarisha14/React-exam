import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../features/rooms/roomSlice";
import { useNavigate } from "react-router-dom"; 
import "./Reservation.css";

const RoomList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { rooms } = useSelector((state) => state.rooms);

  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const sortedRooms = [...rooms].sort((a, b) => {
    if (sortBy === "type") return a.type.localeCompare(b.type);
    return 0; 
  });

  const filteredRooms = sortedRooms.filter((room) => {
    if (!filterBy) return true;
    return room.features?.includes(filterBy);
  });

  const handleBook = (room) => {
    
    navigate("/reserve", { state: { room } });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Available Rooms</h2>

      <div className="row mb-4 g-3">
        <div className="col-md-6">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">-- Sort By --</option>
            <option value="type">Room Type</option>
          </select>
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="">-- Filter By --</option>
            <option value="wifi">WiFi</option>
            <option value="ac">AC</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredRooms.length === 0 ? (
          <p className="text-center">No rooms found.</p>
        ) : (
          filteredRooms.map((room) => (
            <div className="col-md-4 mb-4" key={room.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{room.type}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">₹{room.price}</h6>
                  <p className="card-text mb-2">
                    <strong>Features:</strong>{" "}
                    {room.features?.length ? room.features.join(", ") : "None"}
                  </p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => handleBook(room)}
                  >
                    Book 
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoomList;
