const User = require("../Models/UserModel");

const checkUsernameExists = async (User, username) => {
  const users = await User.find({ username: username });
  return users;
};

const validateUser = () => async (req, res, next) => {
  const user = await checkUsernameExists(User, req.body.username);
  if (user.length > 0)
    return res.status(200).json({ message: "Data Duplicate" });
  next();
};

module.exports = validateUser;
