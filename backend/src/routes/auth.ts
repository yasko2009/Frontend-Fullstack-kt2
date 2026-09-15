import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();

const users = [
  {
    id: 1,
    email: "test@example.com",
    password: "123456",
    name: "Test User",
  },
];

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(
    (item) => item.email === email && item.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Неверный email или пароль",
    });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      message: "JWT_SECRET не настроен",
    });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    secret,
    {
      expiresIn: "1h",
    }
  );

  return res.json({
    token,
  });
});

export default router;