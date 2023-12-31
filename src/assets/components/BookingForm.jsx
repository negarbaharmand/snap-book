import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const BookingForm = ({ id, date, time }) => {
  const baseURL = "http://localhost:8080";
  const [email, setEmail] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const navigate = useNavigate();

  const onBookingSuccess = () => {
    console.log("Booking successful!");
    setBookingSuccess(true);
    toast.success("Your ID has been saved in your clipboard!", {
      position: "top-center",
      onAutoClose: () => navigate("/"),
    });
  };

  const bookAppointment = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/v1/booking/book`, {
        id: id,
        email,
      });
      if (response.status === 201) {
        navigator.clipboard.writeText(id);
        onBookingSuccess();
      }
    } catch (error) {
      const errorMessage =
        typeof error.response.data === "string"
          ? error.response.data
          : error.response.data.email;
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <Toaster richColors />
      <div className="container-sm mt-5">
        <div className="card">
          <div className="card-header bg-dark text-white">
            <h3 className="card-title">Booking</h3>
          </div>
          <div className="card-body">
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
              className="btn btn-primary"
              onClick={bookAppointment}
              disabled={bookingSuccess}
            >
              Book
            </button>
            <br />
            <br />
            <div className="border max-w-xs p-3 p-3 alert alert-light">
              <h3 className="card-title">Booking Details</h3>
              <div className="card-body">
                <div className="mb-3">
                  <p>ID: {id}</p>
                  <p>Date: {date}</p>
                  <p>Time: {time}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
