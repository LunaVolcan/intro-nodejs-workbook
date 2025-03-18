// Your code will go here!

// Retrieve arguments from the command line
const args = process.argv.slice(2);

if (args.length !== 2) {
    console.log("Usage: node index.js <dog's name> <dog's age in human years>");
    process.exit(1);
}

const [dogName, ageInput] = args;

// Validate the age input
const age = parseInt(ageInput, 10);

if (isNaN(age) || age <= 0) {
    console.log("Error: Please enter a valid positive whole number for the dog's age.");
    process.exit(1);
}

// Calculate dog's age in dog years
let dogYears;

if (age === 1) {
    dogYears = 15;
} else if (age === 2) {
    dogYears = 24;
} else {
    dogYears = 24 + (age - 2) * 5;
}

// Output the result
console.log(`Your dog, ${dogName}, is ${age} years old, but that's ${dogYears} years old in dog years!`);