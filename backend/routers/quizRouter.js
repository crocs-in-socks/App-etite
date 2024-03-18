const fs = require('fs')
const csv = require('csv-parser');
const { NotFoundError } = require('openai/error');

const loadDatabase = async () => {
    return new Promise((resolve, reject) => {
        const database_filepath = './fooddatabase.csv';
        const data = [];

        fs.createReadStream(database_filepath)
        .pipe(csv())
        .on('data', (row) => {
            data.push(row);
        })
        .on('end', () => {
            resolve(data);
        })
        .on('error', (error) => {
            reject(error);
        });
    });
}

const countTrueAttributes = async(data, attribute) => {
    const values = Object.values(data)
    const count = values.filter((food) => food[attribute] === '1').length
    return count
}

const getNextQuestion = async (criteriaArray) => {
    try {
        const data = await loadDatabase()

        const filteredData = Object.values(data).filter(food => {
            return criteriaArray.every(criteria => {
                const key = Object.keys(criteria)[0]
                return food[key] === Object.values(criteria)[0]
            })
        })

        const numFoods = Object.keys(filteredData).length

        if(numFoods <= 3) {
            const values = Object.values(filteredData)
            let suggestions = []
            for(const value in values) {
                const food = filteredData[value]
                const food_key = Object.keys(food)[0]
                suggestions.push(food[food_key])
            }
            return {nextquestion: 'done', done: true, suggestions: suggestions}
        }

        const attributes = Object.keys(filteredData['0'])
        attributes.shift()

        const counts = {}
        for (const attr of attributes) {
            const count = await countTrueAttributes(filteredData, attr)
            counts[attr] = count
        }

        const entropy = {}
        for (const attr in counts) {
            entropy[attr] = Math.abs((counts[attr]/numFoods) - 0.5)
        }

        let minAttr = null
        let minEntropy = Infinity
        for(const attr in entropy) {
            const value = entropy[attr]
            if(value < minEntropy) {
                minAttr = attr
                minEntropy = value
            }
        }

        return {nextquestion: minAttr, done: false, suggestions: null}
    }
    catch(error) {
        console.error('Error loading database:', error)
    }
}

module.exports = {loadDatabase, getNextQuestion}