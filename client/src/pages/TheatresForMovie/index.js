import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { hideLoading, showLoading } from '../../redux/loaderSlice';
import { message, Row } from 'antd';
import { GetMovieById } from '../../apicalls/movies';
import moment from 'moment';
import { GetTheatresByMovie } from '../../apicalls/theatres';

const TheatresForMovie = () => {
  const [movie, setMovie] = useState();
  const [theatres, setTheatres] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const getData = async () => {
    const movieId = params.movieId;
    try {
      dispatch(showLoading);
      const response = await GetMovieById(movieId);
      if(response.message){
        setMovie(response.data);
      }else{
        message.error(response.message)
      }
    } catch (error) {
      dispatch(hideLoading);
      message.error(error.message)
    }
  }

  const getTheatres = async () => {
    const movieId = params.movieId;
    try {
      dispatch(showLoading);
      const response = await GetTheatresByMovie({date, movie: movieId});
      if(response.message){
        setTheatres(response.data)
      }else{
        message.error(response.message)
      }
    } catch (error) {
      dispatch(hideLoading);
      message.error(error.message)
    }
  }
console.log(theatres)
  useEffect(()=>{
    getData();
  },[])

  useEffect(()=>{
    getTheatres();
  },[])

  useEffect(()=>{
    getTheatres();
  },[date])
  return (
    <>
      {movie && (
        <div>
          {/* movie information */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className="text-2xl uppercase">
                {movie.title} ({movie.language})
              </h1>
              <h1 className="text-md">Duration : {movie.duration} mins</h1>
              <h1 className="text-md">
                Release Date : {moment(movie.releaseDate).format("MMM Do yyyy")}
              </h1>
              <h1 className="text-md">Genre : {movie.genre}</h1>
            </div>
            <div>
              <h1 className="text-md">Select Date</h1>
              <Row>
                <input
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    navigate(`/movie/${params.movieId}?date=${e.target.value}`);
                  }}
                />
              </Row>
            </div>
          </div>
          <hr></hr>
          {/* Movie Theatres */}
          <h1 className="text-xl uppercase mt-2">theatres</h1>
          <div className="mt-1 flex flex-col gap-1">
            {theatres.map((theatre) => (
              <div className="card p-2">
                <h1 className="text-md uppercase">{theatre.name}</h1>
                <h1 className="text-sm uppercase">
                  Address : {theatre.address}
                </h1>
                <div className="divider"></div>
                <div className="flex gap-2">
                  {theatre.shows
                    .sort(
                      (a, b) =>
                        moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                    )
                    .map((show) => (
                      <div
                        key={show._id}
                        // onMouseEnter={handleMouseEnter}
                        // onMouseLeave={handleMouseLeave}
                        className="card p-1 cursor-pointer border-primary"
                        onClick={() => {navigate(`/book-show/${show._id}`)}}
                      >
                        <div className='font-bold'>
                          {moment(show.time, "HH:mm").format("hh:mm A")}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default TheatresForMovie