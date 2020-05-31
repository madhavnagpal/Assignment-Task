const route = require("express").Router();
const { Tasks, Users, Projects } = require("../db");

route.get("/", async (req, res) => {
  let tasks = await Tasks.findAll({
    include: [Users, Projects],
  });
  res.render("tasks", {
    tasks,
  });
});
module.exports = route;
