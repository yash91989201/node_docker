import express from "express";
import mongoose from "mongoose";
import { createClient } from "redis";
import session from "express-session";
import connect_redis from "connect-redis";
import cors from "cors";
import dotenv from "dotenv";
// router imports
import post_router from "./routes/post";
import auth_router from "./routes/auth";
// config imports
import { MONGODB_URI, REDIS_URL, SESSION_SECRET } from "./config";
dotenv.config();

const RedisStore = connect_redis(session);
const redis_client = createClient({
  url: REDIS_URL,
  legacyMode: true,
});

redis_client.connect().then((err) => console.error(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.enable("trust proxy");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    store: new RedisStore({ client: redis_client }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 30000,
      secure: false,
    },
  })
);

app.use("/api/v1/post", post_router);
app.use("/api/v1/user", auth_router);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to mongodb.");
  })
  .catch((err) => {
    console.error(err.message);
  });
app.listen(PORT, () => {
  console.log(`⚡️Server is running at http://localhost:${PORT}`);
});
