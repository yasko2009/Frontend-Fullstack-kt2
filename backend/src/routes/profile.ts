import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const router = Router();

type AuthRequest = Request & {
  user?: {
    userId: number;
    email: string;
  };
};

function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Требуется авторизация",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Токен отсутствует",
    });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      message: "JWT_SECRET не настроен",
    });
  }

  try {
    const decoded = jwt.verify(token, secret) as {
      userId: number;
      email: string;
    };

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: "Недействительный или просроченный токен",
    });
  }
}

router.get("/", authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({
    id: req.user!.userId,
    email: req.user!.email,
    name: "Test User",
  });
});

export default router;