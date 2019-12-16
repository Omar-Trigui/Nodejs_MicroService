const express = require("express");
const mongoose = require("mongoose");
const bp = require("body-parser");
require("./CustomerModel");
const Customer = mongoose.model("Customer");
const app = express();

app.use(bp.json());
//Connection
mongoose.connect(
  "mongodb://localhost:27017/CustomerService",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("database is connected with CustomerService ");
  }
);
//Routes
app.post("/customer", (req, res) => {
  var newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address
  };
  var customer = new Customer(newCustomer);
  customer
    .save()
    .then(() => {
      res.send("Customer created ");
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});
app.get("/customers", (req, res) => {
  Customer.find()
    .then(customers => {
      res.send(customers);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});
app.get("/customer/:id", (req, res) => {
  Customer.findById(req.params.id).then(data => {
    res.send(data);
  }).catch(err => {
      if(err){
          throw err ;
      }
  });
});
app.delete('/customer/:id',(req,res) => {
    Customer.findByIdAndRemove(req.params.id).then((data) => {
        res.send(data);
        
    }).catch(err => {
        if(err) {
            throw err;
        }
    })
})
app.listen("5555", () => {
  console.log("app and running - customer service");
});
