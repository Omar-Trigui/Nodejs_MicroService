const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
require("./OrderModel");
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://localhost:27017/OrderService",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("database is connected");
  }
);

app.post("/order", (req, res) => {
  var newOrder = {
    CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
    BookID: mongoose.Types.ObjectId(req.body.BookID),
    InitialDate: req.body.InitialDate,
    deliveryDate: req.body.deliveryDate
  };
  var order = new Order(newOrder);
  order
    .save()
    .then(() => {
      res.send("order created");
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});
app.get("/orders", (req, res) => {
  Order.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id)
    .then(order => {
      if (order) {
        axios
          .get("http://127.0.0.1:5555/customer/" + order.CustomerID)
          .then(response => {
            var orderObject = {
              customerName: response.data.name,
              bookTitle: ""
            };
            axios
              .get("http://127.0.0.1:4545/book/" + order.BookID)
              .then(response => {
                orderObject.bookTitle = response.data.Title;
                res.json(orderObject);
                
              });
          });
      } else {
        res.send("invalid order");
      }
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});
const Order = mongoose.model("Order");
app.listen(7777, () => {
  console.log("service Order is running");
});
