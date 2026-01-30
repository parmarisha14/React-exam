import { Routes, Route } from "react-router-dom";
import Navbar from './componets/Navbar';
import RoomList from "./componets/RoomList";
import ReservationForm from "./componets/ReservationForm";
import ReservationList from "./componets/ReservationList";
// import Login from "./components/Login";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<RoomList />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/reserve" element={<ReservationForm />} />
        <Route path="/reservations" element={<ReservationList />} />
      </Routes>
    </>
  );
}

export default App;
