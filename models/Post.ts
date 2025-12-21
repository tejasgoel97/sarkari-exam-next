import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  featureImage?: string;
  contentHtml: string;
  category:
    | "result"
    | "admit-card"
    | "latest-jobs"
    | "answer-key"
    | "syllabus"
    | "admission";
  metaDescription: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    featureImage: { type: String, required: false },
    contentHtml: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "result",
        "admit-card",
        "latest-jobs",
        "answer-key",
        "syllabus",
        "admission",
      ],
      index: true,
    },
    tags: { type: [String], default: [], index: true },
    metaDescription: { type: String, required: true },
  },
  { timestamps: true }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
export default Post;
