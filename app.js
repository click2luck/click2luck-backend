const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const { authenticate } = require("./middleware/auth");
const router = require('./routes/userRoutes.js') 
const cors = require('cors');
const app = express();
app.use(express.json()); //To parse JSON bodies
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
//app.get("/", authenticate, (req, res) => res.json({ msg: "Welcome. Go to /graphql" }));
app.use(
  "/graphql", authenticate,
  graphqlHTTP(req=> ({
    schema,
    context: {
      user: req.headers.authorization
      
    },
    graphiql: true,
  }))
);

app.get("/", (req, res) => {
  console.log("holaa")
  
  res.header("Access-Control-Allow-Origin", "*");
  res.send({ status: 'success' }); } );
 
app.post("/", (req, res) => {

  console.log(req.body)
})  
    app.use(router)
module.exports = app;
