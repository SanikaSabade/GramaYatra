import mongoose from "mongoose";

const hostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  village: { type: String, required: true },
  state: { type: String, required: true },
  bio: { type: String, maxlength: 500 },
  profileImage: { type: String },
  experiences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Host = mongoose.models.Host || mongoose.model("Host", hostSchema);
export default Host;
