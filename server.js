const express = require("express");
const app = express();
// const port = 3000;
const port = process.env.PORT || 80;
const axios = require("axios").default;
const hbs = require("hbs");
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/template"));
let page;
let limit;
let defaultPage = 1;
let defaultLimit = 5;
// let data = {};
let data = {"status":"success","data":[{"id":1,"employee_name":"Tiger Nixon","employee_salary":320800,"employee_age":61,"profile_image":""},{"id":2,"employee_name":"Garrett Winters","employee_salary":170750,"employee_age":63,"profile_image":""},{"id":3,"employee_name":"Ashton Cox","employee_salary":86000,"employee_age":66,"profile_image":""},{"id":4,"employee_name":"Cedric Kelly","employee_salary":433060,"employee_age":22,"profile_image":""},{"id":5,"employee_name":"Airi Satou","employee_salary":162700,"employee_age":33,"profile_image":""},{"id":6,"employee_name":"Brielle Williamson","employee_salary":372000,"employee_age":61,"profile_image":""},{"id":7,"employee_name":"Herrod Chandler","employee_salary":137500,"employee_age":59,"profile_image":""},{"id":8,"employee_name":"Rhona Davidson","employee_salary":327900,"employee_age":55,"profile_image":""},{"id":9,"employee_name":"Colleen Hurst","employee_salary":205500,"employee_age":39,"profile_image":""},{"id":10,"employee_name":"Sonya Frost","employee_salary":103600,"employee_age":23,"profile_image":""},{"id":11,"employee_name":"Jena Gaines","employee_salary":90560,"employee_age":30,"profile_image":""},{"id":12,"employee_name":"Quinn Flynn","employee_salary":342000,"employee_age":22,"profile_image":""},{"id":13,"employee_name":"Charde Marshall","employee_salary":470600,"employee_age":36,"profile_image":""},{"id":14,"employee_name":"Haley Kennedy","employee_salary":313500,"employee_age":43,"profile_image":""},{"id":15,"employee_name":"Tatyana Fitzpatrick","employee_salary":385750,"employee_age":19,"profile_image":""},{"id":16,"employee_name":"Michael Silva","employee_salary":198500,"employee_age":66,"profile_image":""},{"id":17,"employee_name":"Paul Byrd","employee_salary":725000,"employee_age":64,"profile_image":""},{"id":18,"employee_name":"Gloria Little","employee_salary":237500,"employee_age":59,"profile_image":""},{"id":19,"employee_name":"Bradley Greer","employee_salary":132000,"employee_age":41,"profile_image":""},{"id":20,"employee_name":"Dai Rios","employee_salary":217500,"employee_age":35,"profile_image":""},{"id":21,"employee_name":"Jenette Caldwell","employee_salary":345000,"employee_age":30,"profile_image":""},{"id":22,"employee_name":"Yuri Berry","employee_salary":675000,"employee_age":40,"profile_image":""},{"id":23,"employee_name":"Caesar Vance","employee_salary":106450,"employee_age":21,"profile_image":""},{"id":24,"employee_name":"Doris Wilder","employee_salary":85600,"employee_age":23,"profile_image":""}],"message":"Successfully! All records has been fetched."};

axios
  .get("http://dummy.restapiexample.com/api/v1/employees")
  .then(function (res) {
    // data = res.data.data;
    data = res.data.data.length ? res.data.data: data;
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
