import { Schema, models, model, Document } from "mongoose";

export interface ICollection extends Document {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  createdAt: Date;
}

const CollectionSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Collection = models.Collection || model("Collection", CollectionSchema);

export default Collection;
