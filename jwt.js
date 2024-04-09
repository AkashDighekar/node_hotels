const jwt = require("jsonwebtoken");

const jwtAutheMiddleWere = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization)
    return res.status(401).json({ message: "Token Not Found" });
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(500).json({ message: "Unathorize" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Invalid Token" });
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30000 });
};

module.exports = { jwtAutheMiddleWere, generateToken };
