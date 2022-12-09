import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../db/models/user";

export async function signup(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const new_user = new User({
      username,
      password,
    });
    await new_user.save();
    req.session.user = { id: new_user._id, username: new_user.username };
    res.status(201).json({
      success: true,
      message: "Signup successful",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Problem with signup",
      data: null,
    });
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const password_match = await bcrypt.compare(password, user.password);
    if (password_match)
      req.session.user = { id: user._id, username: user.username };
    return res.status(201).json({
      success: true,
      message: "Signin successful.",
      data: null,
    });
    res.status(400).json({ success: false, message: "Invalid credentials." });
    throw new Error();
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Problem with signin.",
      data: null,
    });
  }
}
