import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRETKEY;

if (!secretKey) {
  throw new Error("JWT_SECRETKEY is not defined in the environment variables.");
}

export function generateToken(name, email, role) {
  const userData = { name, email, role };
  const options = { expiresIn: "1h", issuer: "backend server", audience: "frontend server" };
  const token = jwt.sign(userData, secretKey, options);
  return token;
}

export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).send("A token is required for authentication");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    return next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).send("Invalid Token");
  }
}
