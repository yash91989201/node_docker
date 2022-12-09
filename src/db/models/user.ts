import mongoose, { InferSchemaType, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  username: {
    type: String,
    require: [true, "User must have a username"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "User must have a password"],
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password!, 12)!;
  }
  next();
});

export interface PostSchemaType extends InferSchemaType<typeof UserSchema> {}
export default mongoose.models.User || mongoose.model("User", UserSchema);
