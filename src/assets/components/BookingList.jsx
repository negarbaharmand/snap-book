import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const BookingList = () => {
  const currentDate = new Date();
  const startDate = currentDate.toISOString().slice(0, 10);

  const endDateUnFormatted = new Date(currentDate);
  endDateUnFormatted.setDate(currentDate.getDate() + 7);
  const endDate = endDateUnFormatted.toISOString().slice(0, 10);

  const baseURL = "http://localhost:8080";

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(16);
  const navigate = useNavigate();

  const datePrettier = (dateTime) => {
    const dateTimeObj = new Date(dateTime);

    const bookingDate = dateTimeObj.toISOString().split("T")[0];
    const bookingTime = dateTimeObj.toLocaleString("en-US", {
      timeZone: "Europe/Amsterdam",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return [bookingDate, bookingTime];
  };

  const handleButtonClick = (booking) => {
    const [bookingDate, bookingTime] = datePrettier(booking.dateTime);
    const bookingId = booking.id;

    navigate(`/booking-form/${bookingId}/${bookingDate}/${bookingTime}`);
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
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {currentBookings && currentBookings.length && (
              <>
                <div className="d-flex justify-content-center align-items-center mb-4">
                  <h2 className="text-center">Booking List</h2>
                </div>

                <div className="row row-cols-1 row-cols-md-4 g-4">
                  {currentBookings.map((booking) => {
                    const [bookingDate, bookingTime] = datePrettier(
                      booking.dateTime
                    );

                    return (
                      <div key={booking.id} className="col">
                        <div className="card m-2">
                          <div className="card-body m-3">
                            <h6 className="card-title">
                              {bookingDate}
                              <br />
                              {bookingTime}
                            </h6>
                          </div>
                          <div className="d-grid card-footer">
                            <button
                              type="button"
                              className={`btn btn-${
                                booking.booked ? "danger" : "primary"
                              }`}
                              onClick={() => handleButtonClick(booking)}
                              disabled={booking.booked}
                            >
                              {booking.booked ? "Booked" : "Available"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
        {/* Pagination */}
        <div className="pagination m-5 justify-content-center">
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
