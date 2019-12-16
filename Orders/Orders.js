const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./OrderModel");
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://localhost:27017/OrderService",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("database is connected");
  }
);

app.post('/order' , (req,res) => {
    var newOrder ={
        CustomerID : mongoose.Types.ObjectId(req.body.CustomerID) ,
        BookID : mongoose.Types.ObjectId(req.body.BookID) ,
        InitialDate : req.body.InitialDate,
        deliveryDate : req.body.deliveryDate
    }
    var order = new Order(newOrder)
    order.save().then(() => {
        res.send('order created');
        
    }).catch(err => {
        if(err) {
            throw err ;
        }
    })
    
})
app.get('/orders', (req,res) => {
    Order.find().then((data) => {
        res.send(data)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})
const Order = mongoose.model("Order");
app.listen(7777, () => {
  console.log("service Order is running");
});
