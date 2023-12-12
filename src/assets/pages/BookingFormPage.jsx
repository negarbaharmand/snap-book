import BookingForm from "../components/BookingForm";
import { useParams } from "react-router-dom";

const BookingFormPage = () => {
  const { bookingId } = useParams();

  return (
    <div>
      <h2>Booking Form</h2>
      <BookingForm id={bookingId} />
    </div>
  );
};

export default BookingFormPage;
