import { message, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { GetAllMovies } from "../apicalls/movies";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getData = async () => {
    try {
      dispatch(showLoading);
      const response = await GetAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.error);
      }
    } catch (error) {
      message.error(error);
      dispatch(hideLoading);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Row>
        <input
          type="text"
          placeholder="Search For Currenty Showing Movies"
          className="search-input"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Row>

      <Row gutter={[20]} className="mt-2">
        {movies
          .filter((movie) =>
            movie.title.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((movie) => (
            <Col span={6}>
              <div
                className="card flex flex-col gap-1 cursor-pointer"
                onClick={() =>
                  navigate(
                    `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                  )
                }
              >
                <img src={movie.poster} alt="" height={200} />

                <div className="flex justify-center p-1">
                  <h1 className="text-md uppercase">{movie.title}</h1>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Home;
