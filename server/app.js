const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const { mongourl } = require("./config/keys");
const functions = require("firebase-functions");

const app = express();

// allow cross-origin requests
app.use(cors());

mongoose.connect(mongourl);
mongoose.connection.once("open", () => {});

// bind express with graphql
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

exports.app = functions.https.onRequest();
