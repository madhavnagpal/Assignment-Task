const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hey running at server");
});

const port = process.env.PORT || 4000;
app.listen(4000, () =>
  console.log("server is running at http://localhost:4000")
);
