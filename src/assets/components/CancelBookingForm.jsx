import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CancelBookingForm = () => {
  const baseURL = "http://localhost:8080";
  const [bookingId, setBookingId] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onCancelSuccess = () => {
    console.log("Cancellation successful!");
    alert("Cancellation successful! Thank you for using our service.");
    navigate("/");
  };

  const cancelBooking = async () => {
    try {
      const response = await axios.put(`${baseURL}/api/v1/booking/cancel`, {
        id: bookingId,
        email,
      });
      console.log("Cancellation Response:", response.data);
      if (response.status === 204) {
        onCancelSuccess();
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      if (error.response && error.response.data) {
        const errorMessage =
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.email;
        alert(errorMessage);
      } else {
        alert("An error occurred while canceling the booking.");
      }
    }
  };

  return (
    <div className="container-sm mt-5">
      <div className="card">
        <div className="card-header bg-danger text-white">
          <h3 className="card-title">Cancel Booking</h3>
        </div>
        <div className="card-body">
          <div className="form-group mb-3">
            <label htmlFor="bookingId" className="form-label">
              Booking ID:
            </label>
            <input
              type="text"
              className="form-control"
              id="bookingId"
              placeholder="Enter Booking ID"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email Address:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We will never share your email with anyone else.
            </small>
          </div>

          <button
            type="button"
            className="btn btn-danger"
            onClick={cancelBooking}
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingForm;
