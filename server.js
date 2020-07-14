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
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`server is start on port ${PORT}`));
