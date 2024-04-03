import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      return res.status(400).json({
        success: false,
        message: "no token",
      });
    }
    const token = authHeaders.split(" ")[1];
    if (!token || token.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "no token",
      });
    }
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = userId;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export default authMiddleware;
