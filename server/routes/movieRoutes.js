const router = require("express").Router();
const Movie = require("../models/movieModels");
const Show = require("../models/showModel");

router.post("/add", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.send({
      success: true,
      message: "Movie Created",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Internal server error",
    });
  }
});

router.get("/getAllMovies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send({
      success: true,
      message: "Movies Fetched Successfully",
      data: movies,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
});

router.get("/getMovieById/:movieId", async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const movie = await Movie.findOne({ _id: movieId });
    res.send({
      success: true,
      message: "Movie Fetched Successfully",
      data: movie,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
});

router.post("/getTheatresByMovieId", async (req, res) => {
  try {
    const { movie, date } = req.body;
    const shows = Show.find({ movie, date }).populate("theatre");

    // get the unique theatres
    let uniqueTheatres = [];
    (await shows).forEach(show =>{
      const theatre = uniqueTheatres.find(theatre => theatre._id === show.theatre._id)
      if(!theatre){
        const showsForThisTheatre = shows.filter((showObj) => showObj.theatre._id === show.theatre._id);
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows:showsForThisTheatre
        })
      }
    })
    res.send({
      success: true,
      message: "Theatres Fetched successfully",
      data: uniqueTheatres,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
      data:error
    });
  }
});

router.put("/updateMovie", async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.body.movieId, req.body);
    res.send({
      success: true,
      message: "Movies Updated Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
});

router.post("/deleteMovie", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.movieId, req.body);
    res.send({
      success: true,
      message: "Movies Deleted Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
});

exports.router = router;
