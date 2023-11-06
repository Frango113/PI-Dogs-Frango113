const dogsController = require("../../controllers/DogControllers");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const response = await dogsController.getAllDogs();
    return res.status(200).json(response);
  } catch (error) {
    return res.statusMessage(404).json({ error: error.message });
  }
});
router.get("/created", async (req, res) => {
  try {
    const response = await dogsController.dbDogs();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
