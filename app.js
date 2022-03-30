const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const { authenticate } = require("./middleware/auth");
const router = require('./routes/userRoutes.js') 
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser')
app.use(express.json()); //To parse JSON bodies
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.post(
  "/graphql",  graphqlHTTP((req, res, graphQLParams) => {
    return {
    schema,
    context: {
      user: req.headers.authorization,
      res
    }
    ,
    graphiql: true,
}})
);


app.use(cookieParser())
app.get("/", (req, res) => {
  console.log(req.cookies)
  
  res.header("Access-Control-Allow-Origin", "*");
  res.send({ status: 'success' }); } );
 
app.get("/", cookieParser(),(req, res) => {

  console.log(req.body)
})  
    app.use(router)
module.exports = app;
