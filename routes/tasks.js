const route = require("express").Router();
const { Tasks, Users, Projects } = require("../db");

route.get("/", async (req, res) => {
  try {
    let tasks;
    let { filter } = req.query;
    if (filter == "name") {
      tasks = await Tasks.findAll({
        include: [Users, Projects],
        order: [["name", "ASC"]],
      });
    } else if (filter == "username") {
      tasks = await Tasks.findAll({
        include: [Users, Projects],
        order: [[Users, "name"]],
      });
    } else {
      tasks = await Tasks.findAll({
        include: [Users, Projects],
        order: [["description", "ASC"]],
      });
    }
    res.render("tasks", {
      tasks,
    });
  } catch (e) {
    console.log(e);
  }
});
module.exports = route;
