const axios = require('axios');
require('dotenv').config();


const getNutrition = async (query) => {
    try {
        const headers = {
            'X-Api-Key': process.env.CALORIENINJASAPI, // Add your API key here
            // Add any other headers you need
        };

        const response = await axios.get("https://api.calorieninjas.com/v1/nutrition?query=" + query, { headers });
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
    }
};



module.exports = {
    getNutrition
}
