const express = require("express");
const transactionRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
 
transactionRoutes.route("/transaction").get(function (req, res) {
 let db_connect = dbo.getDb("usertransactions");
 db_connect
   .collection("transactions")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

transactionRoutes.route("/transaction/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("transactions")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
transactionRoutes.route("/transaction/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   date: req.body.date,
   category: req.body.category,
   amount: req.body.amount,
   description: req.body.description,
   notes: req.body.notes
 };
 db_connect.collection("transactions").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
transactionRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount,
    description: req.body.description,
    notes: req.body.notes
   },
 };
 db_connect
   .collection("transactions")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
transactionRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("transactions").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = transactionRoutes;