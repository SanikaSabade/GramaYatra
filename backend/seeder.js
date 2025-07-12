import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Experience from "./models/experienceModel.js";
import User from "./models/User.js"; // host is stored here

dotenv.config();
connectDB();

const seedExperiences = async () => {
  try {
    const host = await User.findOne({ role: "host" });

    if (!host) {
      console.log("❌ No host found. Please create a host user first.");
      return process.exit(1);
    }

    const experiences = [
      {
        title: "Rustic Farm Stay in Punjab",
        location: "Amritsar, Punjab",
        description:
          "Experience traditional Punjabi farm life, participate in farming, and enjoy home-cooked meals.",
        price: 2500,
        rating: 4.8,
        images: [
          "https://placehold.co/600x400/A3C1AD/333333?text=Punjabi+Farm",
        ],
        tags: ["Farm Life", "Food", "Culture"],
        seasonal: "Harvest Season",
        isPublic: true,
        host: host._id,
      },
      {
        title: "Himalayan Village Retreat",
        location: "Manali, Himachal Pradesh",
        description:
          "Cozy homestay amidst apple orchards, offering stunning mountain views and local treks.",
        price: 3500,
        rating: 4.9,
        images: [
          "https://placehold.co/600x400/8B8C89/333333?text=Himalayan+Retreat",
        ],
        tags: ["Mountains", "Nature", "Trekking"],
        seasonal: "Spring Blooms",
        isPublic: true,
        host: host._id,
      },
      {
        title: "Backwater Houseboat in Kerala",
        location: "Alleppey, Kerala",
        description:
          "Float through serene backwaters, enjoy Keralan cuisine, and witness village life by the water.",
        price: 4000,
        rating: 4.7,
        images: [
          "https://placehold.co/600x400/4CAF50/333333?text=Kerala+Backwaters",
        ],
        tags: ["Backwaters", "Nature", "Relaxation"],
        seasonal: "Monsoon Magic",
        isPublic: true,
        host: host._id,
      },
      {
        title: "Desert Camp in Rajasthan",
        location: "Jaisalmer, Rajasthan",
        description:
          "Spend nights under the stars in a traditional desert camp, with camel safaris and folk music.",
        price: 3000,
        rating: 4.6,
        images: [
          "https://placehold.co/600x400/D2B48C/333333?text=Rajasthan+Desert",
        ],
        tags: ["Desert", "Culture", "Adventure"],
        seasonal: "Winter Nights",
        isPublic: true,
        host: host._id,
      },
      {
        title: "Konkan Coastal Homestay",
        location: "Guhagar, Maharashtra",
        description:
          "Relax in a coastal village, enjoy fresh seafood, and explore pristine beaches.",
        price: 2000,
        rating: 4.5,
        images: [
          "https://placehold.co/600x400/ADD8E6/333333?text=Konkan+Coast",
        ],
        tags: ["Beach", "Seafood", "Relaxation"],
        seasonal: "Summer Breeze",
        isPublic: true,
        host: host._id,
      },
      {
        title: "Tribal Art Workshop in Odisha",
        location: "Puri, Odisha",
        description:
          "Learn traditional Pattachitra art from local artisans and experience tribal culture.",
        price: 1800,
        rating: 4.7,
        images: ["https://placehold.co/600x400/FFD700/333333?text=Odisha+Art"],
        tags: ["Art", "Culture", "Workshop"],
        seasonal: "Year-round",
        isPublic: true,
        host: host._id,
      },
    ];

    await Experience.deleteMany(); // Clear old data
    await Experience.insertMany(experiences);

    console.log("✅ Experiences seeded successfully.");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding experiences:", err.message);
    process.exit(1);
  }
};

seedExperiences();
