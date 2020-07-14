const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const path = require("path");
const cors = require("cors");

const app = express();

//to fix the cors issue when run local
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.use(express.static("build"));

app.get("*", function (req, res) {
  res.sendFile("index.html");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`server is start on port ${PORT}`));
