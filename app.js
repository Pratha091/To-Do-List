const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// console.log(date);

const items = ["cook", "study"];
const workItems = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extende: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  
    let currentDay = date.getDate();

  res.render("list", { listTitle: currentDay, newListItems: items });
});

app.post("/", function (req, res) {
  console.log(req.body);

  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);

    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
