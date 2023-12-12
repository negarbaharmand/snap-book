import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingFormPage from "../pages/BookingFormPage";
import { BookingList } from "./BookingList";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingList />} />
        <Route path="/booking-form" element={<BookingFormPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
