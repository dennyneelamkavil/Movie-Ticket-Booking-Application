import { useNavigate, useParams } from "react-router-dom";
import { useGetShowtimeByIdQuery } from "../api/showtimeSlice";
import formatTime from "../../utils/formatTime";
import { useEffect, useState } from "react";
import { useGetTheaterByIdQuery } from "../api/theaterSlice";
import { toast } from "react-toastify";

export default function BookingPage() {
  const { showtimeID } = useParams();
  const navigate = useNavigate();
  const { data, refetch } = useGetShowtimeByIdQuery(showtimeID);
  const showtime = data?.showtime || {};
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { data: theaterData } = useGetTheaterByIdQuery(
    showtime?.theaterID?._id
  );
  const theater = theaterData?.theater || {};

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSeatClick = (seat) => {
    if (!seat.isAvailable) return; // Skip unavailable seats
  
    if (selectedSeats.includes(seat._id)) {
      // Deselect seat if it's already selected
      setSelectedSeats((prev) => prev.filter((id) => id !== seat._id));
    } else {
      // Check if the number of selected seats is already 10
      if (selectedSeats.length >= 10) {
        toast.info("You can only select up to 10 seats at once.");
        return;
      }
      // Select seat if less than 10 seats are selected
      setSelectedSeats((prev) => [...prev, seat._id]);
    }
  };  

  const groupedSeats = theater.seatingLayout?.reduce(
    (acc, seat) => {
      const [row, seatNumber] = seat.seatID.split("-");
      if (!acc[seat.seatType]) {
        acc[seat.seatType] = {};
      }
      if (!acc[seat.seatType][row]) {
        acc[seat.seatType][row] = [];
      }
      acc[seat.seatType][row].push(seat);
      return acc;
    },
    {}
  );

  const calculateTotalAmount = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = theater.seatingLayout.find((s) => s._id === seatId); // Find the seat object
      if (seat) {
        return total + seat.price; // Add the seat's price
      }
      return total;
    }, 0);
  };

  const totalAmount = calculateTotalAmount();

  const handlePayClick = async () => {
    navigate("/payments", {
      state: {
        totalAmount,
        selectedSeats,
        showtimeID,
        movieID: showtime?.movieID,
        theaterID: showtime?.theaterID,
        showtimeDate: new Date(showtime?.date).toDateString(),
        showtimeTime: formatTime(showtime?.time),
      },
    });
  };

  if (!showtime) {
    return <div className="container mx-auto p-4">Movie not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
      <div className="card bg-base-100 shadow-xl w-1/2">
        <figure>
          <img
            src={showtime?.movieID?.image}
            alt={showtime?.movieID?.title}
            className="w-full h-auto max-h-96 object-contain"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-xl">{showtime?.movieID?.title}</h2>
          <div className="flex flex-col justify-between">
            <div className="flex gap-4 items-center">
              <h2 className="text-lg font-semibold">Duration: </h2>
              <p>{showtime?.movieID?.duration} minutes</p>
            </div>
            <div className="flex gap-4 items-center">
              <h2 className="text-lg font-semibold">Genre: </h2>
              <p>{showtime?.movieID?.genre}</p>
            </div>
            <div className="flex gap-4 items-center">
              <h2 className="text-lg font-semibold">Rating: </h2>
              <p>{showtime?.movieID?.rating}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body">
            <h3 className="text-xl font-semibold text-center mx-5">
              Selected Showtime and Theater
            </h3>
            <ul className="flex text-center justify-between">
              <li className="flex items-center">
                <h2 className="text-lg font-semibold">Date: </h2>
                <p>{new Date(showtime?.date).toDateString()}</p>
              </li>
              <li className="flex items-center">
                <h2 className="text-lg font-semibold">Time: </h2>
                <p>{showtime?.time && formatTime(showtime?.time)}</p>
              </li>
              <li className="flex items-center">
                <h2 className="text-lg font-semibold">Theater: </h2>
                <p>
                  {showtime?.theaterID?.name}, {showtime?.theaterID?.location}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div className="card bg-base-100 w-full shadow-xl">
            <div className="card-body">
              <h3 className="text-xl font-semibold text-center mx-5">
                Select Your Seats
              </h3>

              {/* Display seats by section (premium, standard) and by rows */}
              {Object.keys(groupedSeats || {}).map((seatType) => (
                <div key={seatType}>
                  <h4 className="text-lg font-bold uppercase">
                    {seatType} Seats
                  </h4>
                  {Object.keys(groupedSeats[seatType]).map((rowName) => (
                    <div key={rowName}>
                      <h5 className="font-medium">{`Row ${rowName}`}</h5>
                      <div className="grid grid-cols-10 gap-2">
                        {groupedSeats[seatType][rowName].map((seat) => (
                          <button
                            key={seat._id}
                            className={`p-2 border rounded ${
                              selectedSeats.includes(seat._id)
                                ? "bg-green-500"
                                : seat.isAvailable
                                ? "bg-gray-300"
                                : "bg-red-500"
                            }`}
                            onClick={() => handleSeatClick(seat)}
                            disabled={!seat.isAvailable}
                          >
                            {seat.seatID} <br /><span className="text-xs">(₹{seat.price})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              <div className="card-actions justify-center">
                {selectedSeats.length > 0 && <button
                  className="btn btn-wide btn-success"
                  onClick={handlePayClick}
                  disabled={selectedSeats.length === 0}
                >
                  {`Pay ${totalAmount}`}
                </button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
