export const getProfile = (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};
