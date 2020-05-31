const route = require("express").Router();
const { Users } = require("../db");

route.get("/", async (req, res) => {
  try {
    let users;
    if (req.body.sortby == "surname") {
      users = await Users.findAll({
        order: [["surname", "ASC"]],
      });
    } else {
      users = await Users.findAll({
        order: [["name", "ASC"]],
      });
    }

    res.render("users", {
      users,
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = route;
