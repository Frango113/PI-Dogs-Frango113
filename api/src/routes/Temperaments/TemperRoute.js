const express = require("express");
const router = express.Router();
const temperController = require("../../controllers/TemperControllers");

router.get("/", async (req, res) => {
  try {
    const response = await temperController.getTempers;
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});
module.exports = router;
