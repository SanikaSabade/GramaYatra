// controllers/experienceController.js
import Experience from "../models/experienceModel.js";
import Host from "../models/Host.js";

// Get all experiences created by a specific host
export const getExperiencesByHost = async (req, res) => {
  try {
    const hostId = req.params.hostId;

    const experiences = await Experience.find({ host: hostId }).select("-__v");
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all public experiences (for any user)
export const getPublicExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ isPublic: true }).populate(
      "host",
      "name village"
    );
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createExperience = async (req, res) => {
  console.log(req.user);
  try {
    // ✅ Allow only hosts
    if (req.user.role !== "host") {
      return res
        .status(403)
        .json({ message: "Access denied. Only hosts can create experiences." });
    }

    const newExperience = new Experience({
      title: req.body.title,
      description: req.body.description,
      village: req.body.village,
      state: req.body.state,
      images: req.body.images || [],
      price: req.body.price,
      duration: req.body.duration,
      isPublic: req.body.isPublic || true,
      host: req.user._id, // Automatically assign host from logged-in user
    });

    const savedExperience = await newExperience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
