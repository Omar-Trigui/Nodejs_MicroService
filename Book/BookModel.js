const mongoose = require("mongoose");

mongoose.model("Book", {
  //Title,author,numberPages,Publisher
  Title: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  numberPages: {
    type: Number,
    require: false
  },
  Publisher: {
    type: String,
    require: false
  }
});
