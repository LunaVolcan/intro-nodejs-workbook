// Create a program that checks to see if the current year is leap year using the Moment module.

// leap-checker.js
import moment from "moment";

// Get the current year
const currentYear = moment().year();

// Check if it's a leap year
const isLeapYear = moment([currentYear]).isLeapYear();

if (isLeapYear) {
  console.log(`${currentYear} is a leap year! 🐸`);
} else {
  console.log(`${currentYear} is NOT a leap year.`);
}