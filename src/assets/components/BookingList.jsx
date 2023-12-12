import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const BookingList = () => {
  const startDate = "2023-12-11";
  const endDate = "2023-12-13";
  const baseURL = "http://localhost:8080";

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(8);
  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    navigate(`/booking-form/${id}`);
  };
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

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            {currentBookings && currentBookings.length !== 0 && (
              <h2 className="mb-4">Booking List</h2>
            )}
            <div className="row">
              {currentBookings.map((booking) => (
                <div key={booking.id} className="card mb-4 col-md-3">
                  <div className="card-body">
                    <h5 className="card-title">{booking.dateTime}</h5>
                  </div>
                  <div className="d-grid card-footer">
                    <button
                      type="button"
                      className={`btn btn-${
                        booking.booked ? "danger" : "success"
                      }`}
                      onClick={() => handleButtonClick(booking.id)}
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
        {/* Pagination */}
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(bookings.length / bookingsPerPage) },
            (_, index) => (
              <button
                className={`btn btn-outline-primary mx-1 mb-1 ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                key={index + 1}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    );
  };

  return <div className="container">{renderBookings()}</div>;
};
