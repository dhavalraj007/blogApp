const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res
      .status(401)
      .send({ message: "no tokens found on the request!", success: false });

  jwt.verify(token, process.env.ACCESS_SECRET, (error, user) => {
    if (error)
      return res.status(403).send({
        message: "token not valid!",
        success: false,
      });
    req.authUser = user;
    next();
  });
}

module.exports = authenticateToken;
