import jwt from "jsonwebtoken"

const verifyToken = async (req, res, next) => {
    let authorization = req.header("authorization")?.trim();
    console.log("Authorization header: ",authorization);
    
    if(!authorization) return res.status(401).send("Authorization header missing");
    if(!authorization.startsWith("Bearer ")) {
        return res.status(401).send("Invalid authorization header");
    }

    const token = authorization.split("Bearer ")[1];
    console.log("token",token);
    
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log("Decoded token: ",decoded);
      req.user = decoded;
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Access token expired",
        });
      }

      return res.status(403).json({
        message: "Invalid token",
      });
    }
}

export default verifyToken;