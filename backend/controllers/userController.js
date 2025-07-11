import User from "../models/User.js";
import Experience from "../models/experienceModel.js";

export const getProfile = (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};

// Add experience to favorites
export const addFavoriteExperience = async (req, res) => {
  try {
    const user = req.user;
    const { experienceId } = req.params;

    if (!user.favorites.includes(experienceId)) {
      user.favorites.push(experienceId);
      await user.save();
    }

    res.status(200).json({ message: "Added to favorites." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove experience from favorites
export const removeFavoriteExperience = async (req, res) => {
  try {
    const user = req.user;
    const { experienceId } = req.params;

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== experienceId
    );
    await user.save();

    res.status(200).json({ message: "Removed from favorites." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all favorite experiences
export const getFavoriteExperiences = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
