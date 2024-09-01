import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetShowById } from "../apicalls/theatres";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import StripeCheckout from "react-stripe-checkout";
import Button from "../components/Button.js";
import moment from "moment";
import { BookShowTickets, MakePayment } from "../apicalls/booking.js";

const BookShow = () => {
  const user = useSelector((state) => state.users.user);
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  //console.log(params,"params")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(showLoading);
      const response = await GetShowById({ showId: params.showId });
      if (response.success) {
        setShow(response.data);
      }
    } catch (error) {
      dispatch(hideLoading);
      message.error(error);
    }
  };

  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = Math.ceil(totalSeats / columns);
    return (
      <div>
        <p className="m-4">Screen This Side</p>
        <hr />
        <div className="flex gap-1 flex-col p-2 card">
          <hr />
          {
            // Array(rows) creates an array with 'rows' number if empty slots.
            // .keys() method returns a new 'Array Iterator' object that conatins key for each index in the array.
            // Array.from() method creates a new array instance from an array-like or iterable object.
            // It can also transform the elements of the array-like or iterable object using a map function.

            Array.from(Array(rows).keys()).map((seat, i) => {
              return (
                <div key={i} className="flex gap-1 justify-center">
                  {Array.from(Array(columns).keys()).map((column, index) => {
                    const seatNumber = seat * columns + column + 1;
                    let seatClass = "seat";
                    if (selectedSeats.includes(seatNumber)) {
                      seatClass = seatClass + " selected-seat";
                    }
                    if (show.bookedSeats.includes(seatNumber)) {
                      seatClass = seatClass + " booked-seat";
                    }

                    return (
                      seatNumber <= totalSeats && (
                        <div
                          key={`${seat}-${column}-${index}`} // Ensure unique key for each seat
                          className={seatClass}
                          onClick={() => {
                            if (selectedSeats.includes(seatNumber)) {
                              setSelectedSeats(
                                selectedSeats.filter(
                                  (item) => item !== seatNumber
                                )
                              );
                            } else {
                              setSelectedSeats([...selectedSeats, seatNumber]);
                            }
                          }}
                        >
                          <h1 className="text-sm">{seatNumber}</h1>
                        </div>
                      )
                    );
                  })}
                </div>
              );
            })
          }
        </div>
      </div>
    );
  };

  const book = async (transactionId) => {
    try {
      dispatch(showLoading);
      const response = await BookShowTickets({
        show: params.showId,
        seats: selectedSeats,
        transactionId,
        user: user._id,
      });
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(hideLoading);
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(showLoading);
      const response = await MakePayment({
        token,
        amount: selectedSeats.length * show.ticketPrice * 100,
      });
      if (response.success) {
        message.success(response.message);
        book(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(hideLoading);
      message.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    show && (
      <>
        <div className="flex justify-between card p-2 items-center">
          <div>
            <h1 className="text-sm">{show.theatre.name}</h1>
            <h1 className="text-sm">{show.theatre.address}</h1>
          </div>
          <div>
            <h1 className="text-2xl uppercase">
              {show.movie.title} ({show.movie.language})
            </h1>
          </div>
          <div>
            <h1 className="text-sm">
              {moment(show.date).format("MMM Do yyyy")} -{" "}
              {moment(show.time, "HH:mm").format("hh:mm A")}
            </h1>
          </div>
        </div>

        {/* seats */}
        <div className="flex justify-center mt-2">{getSeats()}</div>

        {selectedSeats.length > 0 && (
          <div className="mt-2 flex justify-center gap-2 items-center flex-col">
            <div className="flex justify-center">
              <div className="flex uppercase card p-2 gap-3">
                <h1 className="text-sm">
                  <b>Selected Seats</b> : {selectedSeats.join(" ,")}
                </h1>
                <h1 className="text-sm">
                  <b>Total Price</b> : {selectedSeats.length * show.ticketPrice}
                </h1>
              </div>
            </div>
            {
              <StripeCheckout
                token={onToken}
                amount={selectedSeats.length * show.ticketPrice * 100}
                billingAddress
                stripeKey="pk_test_51PtYZdJjBSzLA60PFIVL3knwE1Ho2iV6DjW07pFxn1xfLSyoY6yhR3Yqy7nMyjfCttX5EkviuZokZ6LXFM5AQC6m00iZXKcYQG"
              >
                <Button title={"Book Now"} />
              </StripeCheckout>
            }
          </div>
        )}
      </>
    )
  );
};

export default BookShow;
