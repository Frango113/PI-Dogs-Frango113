const dogRoutes = require("./Dogs/DogRoutes");
const temperRoute = require("./Temperaments/TemperRoute");
const dogsController = require("../controllers/DogControllers");
const getTempers = require("../controllers/TemperControllers");
const searchDogsByName = require("../controllers/DogControllers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = require("express").Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogRoutes);
router.use("/temper", temperRoute);
router.get("/dogs/created", async (req, res) => {
  try {
    const response = await dogsController.dbDogs();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await dogsController.getDetail(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});
router.get("/s/name", async (req, res) => {
  const name = req.query;
  try {
    const dogName = await searchDogsByName(name);
    return res.status(201).json(dogName);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});
router.post("/dogs", async (req, res) => {
  const perro = req.body;
  try {
    const dog = await dogsController.addDog(perro);
    return res.status(201).json(dog);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.get("/temperaments", async (req, res) => {
  try {
    const response = await getTempers();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});
module.exports = router;
