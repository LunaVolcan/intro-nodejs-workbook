const express = require("express"); // external module that will allow us to build a web server
const fs = require("fs").promises; // external module that will allow us to read and write files

const app = express(); // creating an instance of the express module so that we can use all the methods/functions and properties in our web server
const port = 3000; // telling express which port to listen to, to receive requests

app.use(express.json()); // this server will be receiving and responding in JSON

// Create the function that will turn on the server and listen for requests on this port
app.listen(port, () => {
  console.log(`My server is listening on port: ${port}`);
});

// Sending a string
// app.get("/", (req, res) => {
//   res.send("I am gay");
// });

// Sending data
// app.get("/", (req, res) => {
//     const myData = {
//         id: 47,
//         email: "test@test.com"
//     };
//     const myJSONData = JSON.stringify(myData);
//     res.send(myJSONData);
// });

// Specify a route
// app.get("/user", (req, res) => {
//     const myData = {
//         id: 47,
//         email: "test@test.com"
//     };
//     const myJSONData = JSON.stringify(myData);
//     res.send(myJSONData);
// });

// Specify a route with a parameter
// app.get("/users/:user", (req, res) => {
//     const myData = {
//         id: req.params.user,
//         email: "test@test.com"
//     };
//     const myJSONData = JSON.stringify(myData);
//     res.send(myJSONData);
// });

// Helper functions
async function getAllBooks() {
    const books = await fs.readFile("../data.json", "utf-8"); // read the data.json file
    let parsedBooks = JSON.parse(books); // parse the JSON string into a JavaScript object
    console.log(parsedBooks); // log the parsed books to the console
    return parsedBooks; // return the parsed books
}

// Helper function to get one book
async function getOneBook(id) {
  const books = await fs.readFile("../data.json", "utf-8");
  let parsedBooks = JSON.parse(books);
  const book = parsedBooks.find(book => book.id == id); // finds book by id
  console.log(book);
  return book;
}

// Helper function to delete a book by id
async function deleteBook(id) {
    const books = await fs.readFile("../data.json", "utf-8"); 
    let parsedBooks = JSON.parse(books);
    const updatedBooks = parsedBooks.filter(book => book.id != id); // filter out the book with the matching id
    const stringBooks = JSON.stringify(updatedBooks, null, 2);
    await fs.writeFile("../data.json", stringBooks, "utf-8"); // write updated book list back
}

// API Endpoints

// The client has requested all of the books
app.get("/get-all-books", async (req, res) => {
    const books = await getAllBooks();
    res.send(JSON.stringify(books));
});

// The client has requested one specific book using an ID
app.get("/get-one-book/:id", async (req, res) => {
    const book = await getOneBook(req.params.id);
    res.send(JSON.stringify(book));
});

// The client has requested to delete a book by ID
app.get('/delete-book/:id', async (req, res) => {
    await deleteBook(req.params.id);
    res.send("You deleted a book!");
});