const express = require("express");
const app = express();
// const port = 3000;
const port = process.env.PORT || 80;
const axios = require("axios").default;
const hbs = require("hbs");
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/template"));
let data = {};
let page;
let limit;
let defaultPage = 1;
let defaultLimit = 5;

axios
  .get("http://dummy.restapiexample.com/api/v1/employees")
  .then(function (res) {
    data = res.data.data;
  })
  .catch(function (err) {
    console.log(err);
  })
  .then(function () {
    console.log("--- data req finished ---");
  });

app.get("/", function (req, res) {
  page = req.query.page;
  limit = req.query.limit;
  totalEmployees = data.length;
  if (Boolean(page) && Boolean(limit)) {
    if (page <= 0) {
      page = defaultPage;
    }
    if (limit <= 0) {
      limit = defaultLimit;
    }
  } else {
    page = defaultPage;
    limit = defaultLimit;
  }
  if (totalEmployees < page * limit) {
    page = Math.ceil(totalEmployees / limit);
  }
  let lastPage = Math.ceil(totalEmployees / limit);
  let employees = [];
  for (let i = (page - 1) * limit; i < page * limit; i++) {
    if (data[i]) employees.push(data[i]);
  }
  let pagesList = [];
  for (let i = 1; i <= lastPage; i++) {
    pagesList.push([i, "page " + i]);
  }
  // console.log(page, limit);
  res.render("page", {
    employees: employees,
    pagesList: pagesList,
    lastPage: lastPage,
    responsePage: page,
    responseLimit: limit,
  });
});
app.listen(port, (err) => {
  if (err) throw err;
  console.log("server running...");
});
