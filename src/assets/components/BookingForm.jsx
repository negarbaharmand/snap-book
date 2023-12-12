import { useState } from "react";
import axios from "axios";

const BookingForm = ({ onBookingSuccess }) => {
  const baseURL = "http://localhost:8080";
  const [email, setEmail] = useState("");

  const bookAppointment = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/v1/booking/book`, {
        email,
      });
      if (response.status === 201) {
        // Assuming the API returns booking details upon successful booking
        onBookingSuccess();
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      // Handle error, display a message to the user, etc.
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h3 className="card-title">Booking</h3>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Enter Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={bookAppointment}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
