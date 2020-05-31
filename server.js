const express = require("express");
const app = express();
const { db, Users } = require("./db");

app.get("/", (req, res) => {
  res.send("hey running at server");
});

const port = process.env.PORT || 4000;

db.sync({ force: true })
  .then(() => {
    app.listen(port, () =>
      console.log("server is running at http://localhost:4000")
    );
  })
  .catch((e) => console.log(e));
