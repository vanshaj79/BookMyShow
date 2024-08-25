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
        console.log(response)
      }else{
        message.error(response.message)
      }
    } catch (error) {
      dispatch(hideLoading);
      message.error(error.message)
    }
  }

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
    <div>
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
        </div>
      )}
    </div>
  )
}

export default TheatresForMovie