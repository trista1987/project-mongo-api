import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config'


// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const Author = mongoose.model('Author', {
  name: String
})

const Book = mongoose.model('Book', {
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Author'
  }
})

if (process.env.RESET_DATABASE){
  console.log('Resetting database!')
  const seedDatabase = async() => {
//will not duplicate the data again
  await Author.deleteMany()
  await Book.deleteMany()

  const tolkien = new Author({name: 'J.R.R Tolkien'})
  await tolkien.save()

  const rowling = new Author({name: 'J.K. Rowling'})
  await rowling.save()

  await new Book({title: "Harry Potter and the Half-Blood Prince (Harry Potter  #6)", author: rowling}).save()
  await new Book({title: "Harry Potter and the Order of the Phoenix (Harry Potter  #5)", author: rowling}).save()

  

  console.log('Hello worldssnow ')
}

seedDatabase()
}


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get('/authors', async(req, res)=> {
  const authors = await Author.find()
  res.json(authors)

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
