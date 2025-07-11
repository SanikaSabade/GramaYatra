// models/experienceModel.js
import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  village: { type: String },
  state: { type: String },
  images: [String],
  price: { type: Number },
  duration: { type: String },
  isPublic: { type: Boolean, default: true }, // for public access
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Host",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Experience =
  mongoose.models.Experience || mongoose.model("Experience", experienceSchema);
export default Experience;
