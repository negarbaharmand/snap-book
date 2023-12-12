import { useState, useEffect } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

export const BookingList = () => {
  //const navigate = useNavigate();

  const startDate = "2023-12-11";
  const endDate = "2023-12-13";
  const baseURL = "http://localhost:8080";

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseURL}/api/v1/booking/from/${startDate}/to/${endDate}`
      );
      if (response.status === 200) {
        setBookings(response.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Error fetching bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderBookings = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (bookings.length === 0) {
      return <p>No bookings available.</p>;
    }

    return (
      <div>
        <div className="row">
          <div className="col"></div>
        </div>
        <div className="container mt-5">
          <div className="row">
            {bookings && bookings.length !== 0 && (
              <h2 className="mb-4">Booking List</h2>
            )}
            <div className="row">
              {bookings.map((booking) => (
                <div key={booking.id} className="card mb-4 col-md-3">
                  <div className="card-body">
                    <h5 className="card-title">{booking.dateTime}</h5>
                    <button
                      className="btn btn-info"
                      //onClick={() => navigate("/details/" + booking.id)}
                    >
                      Details
                    </button>
                  </div>
                  <div className="d-grid card-footer">
                    <button
                      type="button"
                      className={`btn btn-${
                        booking.booked ? "danger" : "success"
                      }`}
                      onClick={() =>
                        bookingHandler(booking.id, "test.test@test.se")
                      }
                      disabled={`${booking.booked ? "disabled" : ""}`}
                    >
                      {booking.booked ? "Booked" : "Available"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const bookingHandler = async (id, email) => {
    axios
      .post(baseURL + "/api/v1/booking/book", { id, email })
      .then((response) => {
        console.log("RESPONSE:", response);
        if (response.status === 201) {
          console.log("Booking is Done!");
          getBookings();
        }
      })
      .catch((error) => {
        console.log("ERROR:", error);
        // display error message to user if error exist and its status was 400
        if (error.response) {
          console.log(error.response.data);
        }
      });
  };

  return <div className="container">{renderBookings()}</div>;
};
