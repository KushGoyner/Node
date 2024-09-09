const User = require("../MODELS/user");

async function handleGetAllUsers(req, res) {
  const Users = await User.find({});
  return res.json(Users);
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id);

  return res.json({ user });
}

async function updateUserById(req, res) {
  const newName = req.body;
  await User.findByIdAndUpdate(req.params.id, {
    firstName: newName.firstName,
    lastName: newName.lastName,
  });
  return res.json({ status: "Success" });
}

async function deleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "User Deleted Successfully" });
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.jobTitle
  ) {
    return res.status(400).json({ msg: "ALL Fields are req" });
  }
  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });

  return res.status(201).json({ msg: "Success", result });
}
module.exports = {
  handleGetAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  handleCreateNewUser,
};
