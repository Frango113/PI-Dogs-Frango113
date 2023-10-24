const dogRoutes = require("./Dogs/DogRoutes");
const temperRoute = require("./Temperaments/TemperRoute");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = require("express").Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogRoutes);
router.use("/temper", temperRoute);

module.exports = router;
