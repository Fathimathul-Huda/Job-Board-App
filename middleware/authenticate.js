const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.JWT_SECRET || "accesssecret";

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access token missing" });

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
}

module.exports = authenticate;
