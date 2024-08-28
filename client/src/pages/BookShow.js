import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { GetShowById } from '../apicalls/theatres'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/loaderSlice';
import moment from 'moment';

const BookShow = () => {
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(showLoading)
      const response = await GetShowById({showId:params.showId});
      if(response.success){
        setShow(response.data)
      }
    } catch (error) {
      dispatch(hideLoading)
      message.error(error)
    }
  }

  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = Math.ceil(totalSeats / columns);
    return (
      <div>
        <p className='m-4'>Screen This Side</p>
        <hr/>
        <div className='flex gap-1 flex-col p-2 card'>
          <hr/>
          {
            // Array(rows) creates an array with 'rows' number if empty slots.
            // .keys() method returns a new 'Array Iterator' object that conatins key for each index in the array.
            // Array.from() method creates a new array instance from an array-like or iterable object.
            // It can also transform the elements of the array-like or iterable object using a map function.
            Array.from(Array(rows).keys()).map((seat, index)=>{
              return (
                <div className='flex gap-1 justify-center'>
                    {
                      Array.from(Array(columns).keys()).map((column,index) => {
                        const seatNumber = seat * columns + column + 1;
                        let seatClass = "seat";
                        if(selectedSeats.includes(seat * columns + column +1)){
                          seatClass = seatClass + " selected-seat"
                        }
                        if(show.bookedSeats.includes(seat * columns + 1)){
                          seatClass = seatClass + " booked-seat"
                        }

                        return(
                          seat * columns + column + 1 <= totalSeats && (
                            <div
                             className={seatClass}
                             onClick={()=>{
                              if(selectedSeats.includes(seatNumber)){
                                setSelectedSeats(selectedSeats.filter((item) => item != seatNumber));
                              }else{
                                setSelectedSeats([...selectedSeats, seatNumber]);
                              }
                             }}
                            >
                              <h1 className='text-sm'>{seat * columns + column + 1}</h1>
                            </div>
                          )
                        )
                      })
                    }
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  useEffect(()=>{
    getData();
  },[])

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
        <div className='flex justify-center mt-2'>{getSeats()}</div>

        {
          selectedSeats.length > 0 && (
            <div className='mt-2 flex justify-center gap-2 items-center flex-col'>
              <div className='flex justify-center'>
                <div className='flex uppercase card p-2 gap-3'>
                  <h1 className='text-sm'><b>Selected Seats</b> : {selectedSeats.join(",")}</h1>
                  <h1 className='text-sm'>
                    <b>Total Price</b> : {selectedSeats.length * show.ticketPrice}
                  </h1>
                </div>
              </div>
            </div>
          )
        }
      </>
    )
  );
}

export default BookShow