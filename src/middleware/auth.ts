import { NextFunction, Request, Response } from "express";

export default function auth(req: Request, res: Response, next: NextFunction) {
  const { user } = req.session;
  if (user == undefined) {
    return res
      .status(401)
      .json({ status: false, message: "You are not authenticated." });
  }
  next();
}
