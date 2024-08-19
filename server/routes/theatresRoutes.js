const Theatre = require("../models/theatresModel");
const router = require("express").Router();

router.post("/add", async (req, res) => {
  try {
    const theatre = new Theatre(req.body);
    await theatre.save();
    res.send({
      success: true,
      message: "Theatre Created",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.get("/getAllTheatresByOwnerId/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const theatres = await Theatre.find({ owner: userId });
    res.send({
      success: true,
      message: "Theatres Fetched successfully",
      data: theatres,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.get("/getAllTheatres", async (req, res) => {
  try {
    const theatres = await Theatre.find().populate("owner");
    res.send({
      success: true,
      message: "Theatres Fetched successfully",
      data: theatres,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.post("/delete", async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.body.theatreId);
    res.send({
      success: true,
      message: "Theatre Deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.put("/update", async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    res.send({
      success: true,
      message: "Theatre Updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
    });
  }
});

exports.router = router