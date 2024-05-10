import express from "express";
import cors from "cors";
import mongoose, { Schema } from "mongoose";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// set up schema
const netflixSchema = new Schema({
  
    "title": String,
    "director": String,
    "cast": String,
    "country": String,
    "date_added": String,
    "release_year": Number,
    "rating": String,
    "duration": String,
    "listed_in": String,
    "description":String,
    "type": String
})

//set model
const Netflix = mongoose.model('Netflix', netflixSchema)

// seed the database. seeding can be removed when it done
if(process.env.RESET_DATABASE){
  const seedDatabase = async () => {
  await Netflix.deleteMany()
  netflixData.forEach(netflix => {
    new Netflix(netflix).save()
  })
}
seedDatabase()
}



// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9090;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/netflix", async (req, res) => {
  const allNetflix = await Netflix.find()

  if(allNetflix.length > 0) {
    res.json(allNetflix)
  }else {
    res.status(404).send('no dramas/movies was found.')
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
