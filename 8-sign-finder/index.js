const horoscope = require("horoscope");

const args = process.argv.slice(2);
if (args.length < 3) {
  console.error("Usage: node sign-finder.js <month> <day> <year>");
  process.exit(1);
}

const [monthStr, dayStr, yearStr] = args;
const month = parseInt(monthStr, 10);
const day = parseInt(dayStr, 10);
const year = parseInt(yearStr, 10);

const astrologicalSign = horoscope.getSign({month: month, day: day}); 
const zodiacSign = horoscope.getZodiac(year);

const birthstones = {
  1: "Garnet",
  2: "Amethyst",
  3: "Aquamarine",
  4: "Diamond",
  5: "Emerald",
  6: "Pearl",
  7: "Ruby",
  8: "Peridot",
  9: "Sapphire",
  10: "Opal",
  11: "Topaz",
  12: "Turquoise"
};

const birthstoneMonth = birthstones[month];

console.log(`Your astrological sign is ${astrologicalSign} and your zodiac sign is ${zodiacSign}. Your birthstone is ${birthstoneMonth}.`);