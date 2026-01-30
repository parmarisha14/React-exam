import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../features/rooms/roomSlice";
import { useNavigate } from "react-router-dom"; 
import "./RoomList.css";

const RoomList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { rooms } = useSelector((state) => state.rooms);

  const [sortBy, setSortBy] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");

  useEffect(() => { dispatch(fetchRooms()); }, [dispatch]);

  const sortedRooms = [...rooms].sort((a,b) => sortBy === "type" ? a.type.localeCompare(b.type) : 0);
  const filteredRooms = sortedRooms.filter(room => availabilityFilter === "available" ? room.available : availabilityFilter === "unavailable" ? !room.available : true);

  const handleBook = (room) => navigate("/reserve", { state: { room } });

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-light">Room List</h2>

      <div className="row mb-4 g-3">
        <div className="col-md-6">
          <select className="form-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="">-- Sort By --</option>
            <option value="type">Room Type</option>
          </select>
        </div>
        <div className="col-md-6">
          <select className="form-select" value={availabilityFilter} onChange={e => setAvailabilityFilter(e.target.value)}>
            <option value="">-- Filter by Availability --</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredRooms.length === 0 ? (
          <p className="text-center text-light">No rooms found.</p>
        ) : filteredRooms.map(room => (
          <div className="col-md-4 mb-4" key={room.id}>
            <div className="card room-card shadow-sm h-100">
              {room.image && <img src={room.image} alt={room.type} className="card-img-top" style={{height:"200px", objectFit:"cover"}} />}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{room.type}</h5>
                <h6 className="card-subtitle mb-2 text-warning">₹{room.price}</h6>
                <p className={`mb-2 ${room.available ? "text-success" : "text-danger"}`}>{room.available ? "Available" : "Unavailable"}</p>
                <button className="btn btn-primary mt-auto" disabled={!room.available} onClick={() => handleBook(room)}>
                  {room.available ? "Book" : "Unavailable"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
