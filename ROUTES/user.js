const { handleGetAllUsers, getUserById, updateUserById, deleteUserById, handleCreateNewUser } = require('../CONTROLLER/user');
const User = require('../MODELS/user')
const express = require("express");
const router = express.Router();

router.get(`/`, handleGetAllUsers);

/*
  app.get(`/users`, (req, res) => {
    let html = `
      <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>`;
    return res.send(html);
  });
  */

router.get(`/`, async (req, res) => {
  const Users = await User.find({});
  let html = `
      <ul>
      ${Users.map(
        (user) => `<li>${user.firstName} having email ${user.email}</li>`
      ).join("")}
      </ul>`;
  return res.send(html);
});

/*
  app.get(`${api}/users/:id`, (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
  
    return res.json(user);
  });
  */
router.get(`/:id`, getUserById);

// TO BE DONE IN FUTURE LIKE MYSELF IN FUTURE
// TO BE DONE IN FUTURE LIKE MYSELF IN FUTURE
// TO BE DONE IN FUTURE LIKE MYSELF IN FUTURE
// TO BE DONE IN FUTURE LIKE MYSELF IN FUTURE
// TO BE DONE IN FUTURE LIKE MYSELF IN FUTURE
router
  .route("/:id")
  .patch(updateUserById)
  .delete(deleteUserById);

router.post("/",handleCreateNewUser );

module.exports = router;