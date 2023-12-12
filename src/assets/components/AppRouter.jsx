import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingFormPage from "../pages/BookingFormPage";
import { BookingList } from "./BookingList";
// import CancelBookingPage from "../pages/CancelBookingPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingList />} />
        <Route path="/booking-form" element={<></>} />
        <Route
          path="/booking-form/:id/:date/:time"
          element={<BookingFormPage />}
        />
        {/* <Route path="/cancel-booking/:bookingId" element={<CancelBookingPage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
