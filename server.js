const express = require("express");
const app = express();
const { db } = require("./db");
const userRoute = require("./routes/users");
const taskRoute = require("./routes/tasks");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.use("/", express.static(__dirname + "/public"));
app.use("/api/users", userRoute);
app.use("/api/tasks", taskRoute);

const port = process.env.PORT || 4000;

db.sync({ force: true })
  .then(() => {
    app.listen(port, () =>
      console.log("server is running at http://localhost:4000")
    );
  })
  .catch((e) => console.log(e));
