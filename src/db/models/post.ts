import mongoose, { Schema, InferSchemaType } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    require: [true, "Post must have a title"],
  },
  body: {
    type: String,
    require: [true, "Post must have a title"],
  },
});

export interface PostSchemaType extends InferSchemaType<typeof PostSchema> {}
export default mongoose.models.Post || mongoose.model("Post", PostSchema);
