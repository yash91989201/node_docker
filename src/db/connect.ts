import mongoose from "mongoose";
// import config
import { MONGODB_URI } from "../config";

export default function connectToDB() {
  console.log(MONGODB_URI);
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to mongodb.");
    })
    .catch((err) => {
      console.error(err.message);
    });
}
