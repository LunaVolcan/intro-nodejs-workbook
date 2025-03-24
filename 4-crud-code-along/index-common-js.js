// Create a module that accesses the file system and uses Common JS modules

//  Alllowing my file to access the file system Node Modlule (this is built into node)
const fs = require("fs");

// We want the user to be anle to pass a vlue into the file when we run the file with Node. This take the third item in the array (the first two are built into the array by defaukly)
const action = process.argv[2];
// We want Node to read the data. jsom file and get all of the books listed.
function printAllBooks() {
  //The readFile module is part of the fs object. It takes in three parameters: the file we want to read, the way the file is encoded, and the function we want to run once we have read the file
  fs.readFile("./data.json", "utf8", (err, data) => {
    //Turning a JSON object into JavaScript
    const books = JSON.parse(data);
    // A loop that prints  to the console the title and text of each book in the JSON file
    for (let i = 0; i < books.length; i++) {
      console.log(books[i].title + "\n");
      console.log(books[i].text + "\n");
    }
  });
}

function printOneBook(num) {
  fs.readFile("./data.json", "utf8", (err, data) => {
    //Turning a JSON object into JavaScript
    const books = JSON.parse(data);
    // A loop that prints  to the console the title and text of each book in the JSON file
    for (let i = 0; i < books.length; i++) {
      if (i === Number(num)) {
        console.log(books[i].title + "\n");
        console.log(books[i].text + "\n");
      }
    }
  });
}

if (action === "getAll") {
    printAllBooks()
} else if (action === "getOne") {
  printOneBook(process.argv[3]);
} else {
    console.log("there was an error")
}