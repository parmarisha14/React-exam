import { Routes, Route } from "react-router-dom";
import Navbar from './componets/Navbar';
import RoomList from "./componets/RoomList";
import ReservationForm from "./componets/ReservationForm";
import ReservationList from "./componets/ReservationList";
import Login from "./componets/Login";
import ProtectedRoute from "./componets/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        
        <Route path="/" element={<ProtectedRoute><RoomList /></ProtectedRoute>} />
        <Route path="/reserve" element={<ProtectedRoute><ReservationForm /></ProtectedRoute>} />
        <Route path="/reservations" element={<ProtectedRoute><ReservationList /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
