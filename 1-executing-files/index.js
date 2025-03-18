// Run the following file with the node command in the terminal.

const number = 35; // You can change this number to test others
let isPrime = true;

if (number === 1) {
    console.log("1 is neither prime nor composite.");
} else if (number > 1) {
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            isPrime = false;
            break;
        }
    }

    if (isPrime) {
        console.log(`${number} is a prime number.`);
    } else {
        console.log(`${number} is not a prime number.`);
    }
} else {
    console.log("The number is not a positive integer.");
}
