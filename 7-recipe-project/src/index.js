import express from "express";
import { promises as fs } from "fs"; // import the fs library using ES module syntax

const app = express(); // create an instance of the express library
const port = 3000; // specify the port that the server will listen on

app.use(express.json()); // specify that the server will use JSON

app.listen(port, () => {
  console.log(`My server is listening on port: ${port}`);
});

// Helper functions
async function getAllRecipes() {
  const recipes = await fs.readFile("../data/recipe-data.json", "utf-8");
  let parsedRecipes = JSON.parse(recipes);
  console.log(parsedRecipes);
  // Return the entire array of recipes
  return parsedRecipes;
}

async function getOneRecipe(id) {
  const recipes = await fs.readFile("../data/recipe-data.json", "utf-8");
  let parsedRecipes = JSON.parse(recipes);
  console.log(parsedRecipes[id]);
  // Return the recipe at the given index
  return parsedRecipes[id];
}

async function deleteRecipe(id) {
 const recipes = await fs.readFile("../data/recipe-data.json", "utf-8");
  let parsedRecipes = JSON.parse(recipes);
  // Remove the recipe at the given index
  parsedRecipes.splice(id, 1);
  console.log(parsedRecipes);
  // Write the updated array back to the file
  await fs.writeFile("../data.json", JSON.stringify(parsedRecipes), "utf-8");
}

async function updateRecipe(id, newTitle) {
    const data = await fs.readFile("../data/recipe-data.json", "utf-8");
    const parsedRecipes = JSON.parse(data);
    parsedRecipes[id].title = newTitle;
    await fs.writeFile("../data/recipe-data.json", JSON.stringify(parsedRecipes), "utf-8");
  }

// API endpoints
// Change the route to match what you're hitting in the browser:
app.get("/get-all-recipes", async (req, res) => {
  const recipes = await getAllRecipes();
  res.send(recipes);
});

app.get("/get-recipe/:id", async (req, res) => {
  const recipe = await getOneRecipe(req.params.id);
  res.send(recipe);
});

app.get("/delete-recipe/:id", async (req, res) => {
  await deleteRecipe(req.params.id);
  res.send("Recipe deleted");
});


app.get("/update-recipe/:id/:newTitle", async (req, res) => {
    const { id, newTitle } = req.params;
    await updateRecipe(id, newTitle);
    res.send("Recipe updated");
  });

// `http://localhost:3000/update-recipe/1/Lasagna`