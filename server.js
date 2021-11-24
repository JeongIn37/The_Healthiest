const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.use("/script", express.static(__dirname + "/script"));

var db;
const MongoClient = require("mongodb").MongoClient;
app.use(express.urlencoded({ extended: true }));

MongoClient.connect(
  "mongodb+srv://admin:health1234@cluster0.g6wfe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  function (err, client) {
    if (err) {
      return console.log(err);
    }
    db = client.db("The_Healthiest");

    //ejs 설치
    app.set("view engine", "ejs");

    //연결 성공시
    app.listen(8080, function () {
      console.log("listening on 8080");
    });
    app.get("/challenge/stamp", function (req, res) {
      db.collection("challenge")
        .find()
        .toArray(function (err, result) {});
      res.sendFile(__dirname + "/views/challenge/challenge-stamp.html");
    });
  }
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/main/main_before_login.html");
});

app.get("/main", function (req, res) {
  res.sendFile(__dirname + "/views/main/main_after_login.html");
});

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/views/main/login.html");
});

app.get("/join", function (req, res) {
  res.sendFile(__dirname + "/views/main/join.html");
});

app.get("/info", function (req, res) {
  res.sendFile(__dirname + "/views/main/info_before_login.html");
});

app.get("/health", function (req, res) {
  res.sendFile(__dirname + "/views/main/health_before_login.html");
});

app.get("/community_main", function (req, res) {
  res.sendFile(__dirname + "/views/main/communitymain_before_login.html");
});

app.get("/challenge_main", function (req, res) {
  res.sendFile(__dirname + "/views/main/challengemain_before_login.html");
});

app.get("/hometraining_main", function (req, res) {
  res.sendFile(__dirname + "/views/main/hometraining_before_login.html");
});

app.get("/info2", function (req, res) {
  res.sendFile(__dirname + "/views/main/info_after_login.html");
});

app.get("/health2", function (req, res) {
  res.sendFile(__dirname + "/views/main/health_after_login.html");
});

app.get("/hometraining_main2", function (req, res) {
  res.sendFile(__dirname + "/views/main/hometraining_after_login.html");
});

app.get("/community", function (req, res) {
  res.render("community/comm_list.ejs");
});

app.get("/comm_free", function (req, res) {
  res.render("community/comm_free.ejs");
});

app.get("/comm_body", function (req, res) {
  res.render("community/comm_body.ejs");
});

app.get("/comm_crew", function (req, res) {
  res.render("community/comm_crew.ejs");
});

app.get("/comm_tips", function (req, res) {
  res.render("community/comm_tips.ejs");
});

app.get("/comm_meal", function (req, res) {
  res.render("community/comm_meal.ejs");
});

app.get("/comm_go", function (req, res) {
  res.render("community/comm_go.ejs");
});

app.get("/challenge/introduce", function (req, res) {
  res.sendFile(__dirname + "/views/challenge/challenge-introduce.html");
});

app.get("/challenge/certification", function (req, res) {
  res.sendFile(__dirname + "/views/challenge/challenge-certification.html");
});

app.get("/challenge/payment", function (req, res) {
  res.sendFile(__dirname + "/views/challenge/challenge-payment.html");
});

let multer = require("multer");
const { Db } = require("mongodb");
var date;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploadImage");
  },
  filename: function (req, file, cb) {
    date = new Date().getDate();
    cb(null, date + ".jpg");
  },
});

var upload = multer({ storage: storage });

app.post(
  "/challenge/certification",
  upload.single("imageInput"),
  function (req, res) {
    console.log("upload complete");
    console.log(req.file);
  }
);
