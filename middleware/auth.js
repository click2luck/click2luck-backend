const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

let logged = true;
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  try {
    const verified = jwt.verify(token, JWT_SECRET); 
    req.verifiedUser = verified.user;
    console.log(verified.user.role)
    next();
  } catch (error) {
    console.log("fallito")
    logged= false;
    next();
  }

};

module.exports = {
  authenticate, logged
};
