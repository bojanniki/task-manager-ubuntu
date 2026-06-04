const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  //look for the token in the "Authorization" header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //format: "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: "Access denied.No token provided" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; //Add the user data to the request object
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};
