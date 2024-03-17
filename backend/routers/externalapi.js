const axios = require('axios');
require('dotenv').config();



const getNutrition = async (query) => {
    const apiKey = process.env.CALORIENINJASAPI;
     // Replace 'YOUR_API_KEY' with your actual API key
    const url = `https://api.calorieninjas.com/v1/nutrition?query=${query}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'X-Api-Key': apiKey
            }
        });
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Request failed:', error.message);
        throw error;
    }
};



module.exports = {
    getNutrition
};
