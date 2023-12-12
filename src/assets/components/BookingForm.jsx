import { useState } from "react";
import axios from "axios";

const BookingForm = ({ id, date, time }) => {
  const baseURL = "http://localhost:8080";
  const [email, setEmail] = useState("");

  const onBookingSuccess = () => {
    console.log("Booking successful!");
    alert("Booking successful! Thank you for booking.");
  };

  const bookAppointment = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/v1/booking/book`, {
        id: id,
        email,
      });
      if (response.status === 201) {
        // Assuming the API returns booking details upon successful booking
        onBookingSuccess();
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert(
        "Appointment Already Booked: If needed, please check your existing bookings or use a different email for a new appointment."
      );

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
        <br />
        <br />
        <div>
          <h3 className="card-title">Booking Details</h3>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <p>ID: {id}</p>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
