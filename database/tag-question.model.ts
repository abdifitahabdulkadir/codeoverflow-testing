import { Schema, models, model, Document } from "mongoose";

export interface ITagQuestion extends Document {
  tag: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
}

const TagQuestionSchema = new Schema<ITagQuestion>(
  {
    tag: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  },
  { timestamps: true }
);

const TagQuestion =
  models?.TagQuestion || model<ITagQuestion>("TagQuestion", TagQuestionSchema);

export default TagQuestion;
