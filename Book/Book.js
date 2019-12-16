//load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//load mongoose
const mongoose = require("mongoose");
require("./BookModel");
const Book = mongoose.model("Book");
//connect
mongoose.connect(
    
  "mongodb://localhost:27017/BookService",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("database is connected");
  }
);
//open express server
app.get("/", (req, res) => {
  res.send("this is our main book endpoint");
});
//Create book
app.post("/book", (req, res) => {
  console.log(req.body);
  var newBook = {
    Title: req.body.Title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    Publisher: req.body.Publisher
  };
  //create new book
  var book = new Book(newBook);
  book.save().then(() => {
      console.log("new book created");
  }).catch((err) => {
      if(err){
          throw err ;
      }
  });
  res.send("testing our book route");
});
app.listen(4545, () => {
  console.log("up and running ! with port 4545");
});
