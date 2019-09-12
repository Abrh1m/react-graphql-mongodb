const express = require("express");
const functions = require("firebase-functions");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const { mongourl } = require("./config/keys");
const cors = require("cors");

const app = express();

//Allow cross-origin requests
app.use(cors());
const dbconn = mongourl;

// Connecting to the MongoDB Atlas
mongoose.connect(dbconn);

mongoose.connection.once("open", () => {});

const port = process.env.PORT || 4000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});

// exports.graphql = functions.https.onRequest(app);
