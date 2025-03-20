import express from 'express'; // 3rd party module

import fs from 'fs'; // internal module

const app = express(); 

const port = 3000;
app.use(express.json());    

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// app.get('/', (req, res) => {
//     const myData = {
//         id: 1,
//         name: 'John',
//         age: 30
//     }
//     const myJsonData = JSON.stringify(myData);
//     res.send(myJsonData);
// });

app.get('/user', (_, res) => {
    const myData = {
        id: 1,
        name: 'John',
        age: 30
    }
    const myJsonData = JSON.stringify(myData);
    res.send(myJsonData);
});
//Helper Functions 

function getAllBooks() {
    //this gets all the book data 
    const books = fs.readFile('../data.json', 'utf8', (_, data) => {
    return JSON.parse(data);
    });
    return books;
}


//the user has requested all books data 
app.get("/get-all-books", async (_, res) => {
    const books = getAllBooks();
    res.send(JSON.stringify(books));
});

app.get('/get-one-book/:id', async (req, res) => {
    const book = await getOneBook(req.params.id);
    res.send(JSON.stringify(book));
});

