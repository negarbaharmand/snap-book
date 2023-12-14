import BookingForm from "../components/BookingForm";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const BookingFormPage = () => {
  const { id, date, time } = useParams();
  return (
    <div>
      <Header />
      <BookingForm id={id} date={date} time={time} />
    </div>
  );
};

export default BookingFormPage;
