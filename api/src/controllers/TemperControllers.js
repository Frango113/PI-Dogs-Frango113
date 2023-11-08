const axios = require("axios");
const { Temperament } = require("../db");
const { apikey } = process.env;

const getTempers = async () => {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${apikey}`
    );
    const dogBreeds = response.data;
    //console.log(dogBreeds);
    const uniqueTemperaments = new Set();

    dogBreeds.forEach((breed) => {
      if (breed.temperament) {
        const breedTemperaments = breed.temperament
          .split(", ")
          .map((t) => t.trim());
        breedTemperaments.forEach((temperament) => {
          uniqueTemperaments.add(temperament);
        });
      }
    });

    //console.log(breedTemperaments);

    const temperArray = Array.from(uniqueTemperaments);
    //console.log(temperArray);
    await Temperament.bulkCreate(
      temperArray.map((temperament) => ({
        Nombre: temperament,
      }))
    );
    //console.log("Tempers have been succesfully saved in the database ");
  } catch (error) {
    console.error("There was an error while fetching and saving the tempers: ");
  }
};
module.exports = getTempers;
