import Host from "../models/hostModel.js";

export const getAllHosts = async (req, res) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Access denied. Only users can view hosts." });
  }

  try {
    const hosts = await Host.find().select("-__v");
    res.status(200).json(hosts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getHostById = async (req, res) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Access denied. Only users can view host details." });
  }

  try {
    const host = await Host.findById(req.params.id);
    if (!host) return res.status(404).json({ message: "Host not found" });

    res.status(200).json(host);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

