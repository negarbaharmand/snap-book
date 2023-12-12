import BookingForm from "../components/BookingForm";
import { useParams } from "react-router-dom";

const BookingFormPage = () => {
  const { id, date, time } = useParams();
  return (
    <div>
      <h2>Booking Form</h2>
      <BookingForm id={id} date={date} time={time} />
    </div>
  );
};

export default BookingFormPage;
