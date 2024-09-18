import { useLocation } from "react-router-dom";
import { useGetTheaterByIdQuery } from "../api/theaterSlice";

export default function PaymentPage() {
  const location = useLocation();
  const {
    totalAmount,
    selectedSeats,
    showtimeID,
    movieID,
    theaterID,
    showtimeDate,
    showtimeTime,
  } = location.state || {};
  const { data: theaterData } = useGetTheaterByIdQuery(theaterID._id);
  const theater = theaterData?.theater || {};
  
  if (!totalAmount || !selectedSeats || !showtimeID || !theater) {
    return <div>No booking details found. Please go back and try again.</div>;
  }
  const getSeatID = (seatId) => {
    const seat = theater.seatingLayout.find((s) => s._id === seatId);
    return seat ? seat.seatID : "Unknown seat";
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold">Payment Details</h2>
      <p>Movie: {movieID.title}</p>
      <p>Theater: {theaterID.name}</p>
      <p>Date: {showtimeDate}</p>
      <p>Time: {showtimeTime}</p>
      <p>Total Amount: ₹{totalAmount}</p>
      <p>Selected Seats:</p>
      <ul>
        {selectedSeats.map((seatId) => (
          <li key={seatId}>{getSeatID(seatId)}</li>
        ))}
      </ul>
      {/* Implement the payment logic here */}
    </div>
  );
}
