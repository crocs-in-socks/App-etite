const fs = require('fs');
const csv = require('csv-parser');

require('dotenv').config();
const apiKey = process.env.OPENAIKEY;


const inputFile = 'fooddatabase.csv'; // Path to your input CSV file
const outputFile = 'fooddatabase.csv'; // Path to your output CSV file

const rows = [];
const openai = require('openai');

const openaiClient = new openai({ apiKey: apiKey });

async function main(food) {
  const completion = await openaiClient.chat.completions.create({
    messages: [{ role: "system", content: "You are an expert food taster and have been hired to fill out the following values for the food : "+food+". The values are: (you give answers as a boolean) 1. Is it vegetarian\n 2. Is it sweet\n 3. Is it savory\n 4. Is it spicy\n 5. Is it baked\n 6. Is it fried\n 7. Is it served hot\n 8. Does it have high protein content\n 9. Does it have low fat. Answer in one line with comma separated values eg: True,False,True,False" }],
    model: "gpt-3.5-turbo",
  });
  console.log(food)
  console.log('vegetarian,sweet,savory,spicy,baked,fried,hot,high protein,low fat')
  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content
}

function processRow(index) {
  if (index < rows.length) {
    const row = rows[index];
    const keys = Object.keys(row);
    // for (let i = 1; i <= 4; i++) {
    //   row[keys[i]] = `Modifiedio ${i}`;
    // }
    main(row[keys[0]]).then((response) => {
      const values = response.split(',')
      for (let i = 0; i < values.length; i++) {
        row[keys[i + 1]] = values[i].trim(); // Assign each value to the corresponding column in the row
      }
      setTimeout(() => {
        processRow(index + 1);
      }, 2000); // 25-second delay
    });
  } else {
    // All rows processed, write to CSV file
    const ws = fs.createWriteStream(outputFile);
    ws.write(Object.keys(rows[0]).join(',') + '\n');
    rows.forEach((row) => {
      ws.write(Object.values(row).join(',') + '\n');
    });
    ws.end();
    console.log('CSV file successfully processed.');
  }
}

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    rows.push(row);
  })
  .on('end', () => {
    // Start processing rows with a delay
    setTimeout(() => {
      processRow(0);
    }, 25000); // Initial 25-second delay
  });
