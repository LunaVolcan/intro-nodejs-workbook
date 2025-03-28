import express from 'express';
import pg from 'pg';
const { Client } = pg;
import config from "./config.js";

const app = express();
const port = 3000;

app.use(express.json( ));

const client = new Client(config); //creating our database Client with our config values

app.listen(port, ( ) => {
    console.log(`Example app listening at http://localhost:${port}`);
});
 

// Helper Function 
async function getAllLanguages() {
        await client.connect(); //connecting to our database
        let result = await client.query("SELECT * FROM programming_languages");
        console.log(result);
        await client.end();  //closing our connection to the database
}

async function getOneLanguage(id) {
        const client = new Client(config);
        await client.connect();
        let result = await client.query("SELECT * FROM programming_languages WHERE id = $1", [id]);
        console.log(result);
        await client.end();
        return result.rows;
}

async function getAllLanguagesSortedByYear() {
        const client = new Client(config);
        await client.connect();
        let result = await client.query("SELECT * FROM programming_languages ORDER BY released_year ASC");
        await client.end();
        return result.rows;
  }
  
  async function getAllLanguagesSortedBy(column) {
        const validColumns = ["id", "name", "released_year", "githut_rank", "pypl_rank", "tiobe_rank"];
        if (!validColumns.includes(column)) {
        throw new Error("Invalid column");
    }
  
    const client = new Client(config);
            await client.connect();
            let result = await client.query(`SELECT * FROM programming_languages ORDER BY ${column} ASC`);
            await client.end();
            return result.rows;
  }
  
  async function searchLanguagesByName(name) {
        const client = new Client(config);
        await client.connect();
        let result = await client.query(
        "SELECT * FROM programming_languages WHERE LOWER(name) LIKE LOWER($1)",
        [`%${name}%`]
        );
        await client.end();
        return result.rows;
  }


// API Endpoint
app.get("/get-all-languages", async (req, res) => {
        let languages = await getAllLanguages();
        let JSONlanguages = JSON.stringify(languages);
        res.send(JSONlanguages);
});

app.get("/get-one-language/:id", async (req, res) => {
        let selectedLanguage = await getOneLanguage(req.params.id);
        let JSONselectedLanguage = JSON.stringify(selectedLanguage);
        res.send(JSONselectedLanguage);
});

app.get("/get-all-languages/sort-by-year", async (req, res) => {
        let languages = await getAllLanguagesSortedByYear();
        res.json(languages);
  });
  
  app.get("/get-all-languages/sort-by/:column", async (req, res) => {
        try {
        let languages = await getAllLanguagesSortedBy(req.params.column);
        res.json(languages);
        } catch (error) {
        res.status(400).json({ error: "Invalid column name." });
        }
  });
  
  app.get("/search-languages-by-name/:name", async (req, res) => {
        let languages = await searchLanguagesByName(req.params.name);
        res.json(languages);
  });





