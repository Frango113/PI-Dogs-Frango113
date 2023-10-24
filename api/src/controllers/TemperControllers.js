const axios = require("axios");
const { Temperament } = require("../db");
const { apikey } = process.env;

const getTempers = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${apikey}`
    );
    const dogBreeds = response.data;

    const uniqueTemperaments = new Set();

    dogBreeds.forEach((breed) => {
      if (dogBreeds.temperament) {
        const breedTemperaments = breed.temperament
          .split(",")
          .map((t) => t.trim());
        breedTemperaments.forEach((temperament) => {
          uniqueTemperaments.add(temperament);
        });
      }
    });
    const temperArray = Array.from(uniqueTemperaments);

    await Temperament.bulkCreate(
      temperArray.map((temperament) => ({
        Nombre: temperament,
      }))
    );
  } catch {
    console.error(
      "There was an error while fetching and saving the tempers: ",
      error
    );
  }
};
module.exports = {
  getTempers,
};
