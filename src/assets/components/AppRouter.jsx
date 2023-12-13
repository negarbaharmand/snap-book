import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingFormPage from "../pages/BookingFormPage";
import HomePage from "../pages/HomePage";
import CancelBookingPage from "../pages/CancelBookingPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/booking-form" element={<></>} />
        <Route
          path="/booking-form/:id/:date/:time"
          element={<BookingFormPage />}
        />
        <Route path="/cancel" element={<CancelBookingPage />} />
        <Route path="/booking" element={<BookingFormPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
