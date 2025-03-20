// Create a Node app that determines the birthstone based on a month inputted by the user. Refer to the README instructions. 

const fs = require('fs');
const path = require('path');

// Get the month name from the command-line arguments
const month = process.argv[2];

if (!month) {
  console.log("Please provide a month name. Example: node birthstone.js January");
  process.exit(1);
}

// Build the path to the data.json file
const dataPath = path.join(__dirname, 'data.json');

// Read and parse the JSON data asynchronously
fs.readFile(dataPath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading data file:", err);
    return;
  }
  
  try {
    const birthstones = JSON.parse(data);
    // Retrieve the birthstone for the provided month
    const birthstone = birthstones[month];
    
    if (birthstone) {
      console.log(`The birthstone for ${month} is ${birthstone}.`);
    } else {
      console.log(`No birthstone found for ${month}. Please check your input.`);
    }
  } catch (parseError) {
    console.error("Error parsing JSON data:", parseError);
  }
});