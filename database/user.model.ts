import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  image: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    bio: { type: String },
    image: { type: String, required: true },
    location: { type: String },
    portfolio: { type: String },
    reputation: { type: Number, default: 0 },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
