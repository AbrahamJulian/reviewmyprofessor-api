const express = require("express");
//const bcrypt = require("bcrypt-nodejs");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = {
  review: [
    {
      id: 1,
      name: "Kyle Dewey",
      university: "CSU Northridge",
      comments: [
        "Awesome professor",
        "Projects relates to materials taught in class",
      ],
      ratings: [5, 5],
    },
    {
      id: 2,
      name: "Richard Lorentz",
      university: "CSU Northridge",
      comments: [
        "Suppeeerr hard test",
        "Class is challenging definitely taking it again",
        "How do you even pass this class?",
        "Hey I got a B!",
      ],
      ratings: [2, 2, 4, 4],
    },
  ],
  users: [
    {
      email: "john",
      password: "cookies",
      isAdmin: true,
    },
  ],
  reviewPending: [
    {
      id: "test",
      name: "jasdksjlkdsa",
      university: "bblblblee",
      comments: ["test1"],
      ratings: [2],
    },
    {
      id: "test2",
      name: "ajskldfs",
      university: "asfds",
      comments: ["test2"],
      ratings: [4],
    },
  ],
};

app.get("/signin", (req, res) => {
  const { email, password } = req.body;
  db.map.users((user) => {
    if (user.email == email) {
      if (user.password == password) res.send(user);
    }
  });
});

app.get("/", (req, res) => {
  const data = {
    review: db.review,
    pending: db.reviewPending,
  };
  res.send(data);
});

app.get("/home", (req, res) => {
  res.send(db.review);
});

app.get("/pending", (req, res) => {
  res.send(db.reviewPending);
});

app.post("/addProfessor/:isAdmin", (req, res) => {
  const { id, name, university, comments, ratings } = req.body;
  const { isAdmin } = req.params;
  if (isAdmin == "true") {
    db.review.push({
      id: id,
      name: name,
      university: university,
      comments: comments,
      ratings: ratings,
    });
    res.json(db.review[db.review.length - 1]);
    db.review.map((rev) => console.log(rev));
    console.log("approved review");
  } else {
    db.reviewPending.push({
      id: id,
      name: name,
      university: university,
      comments: comments,
      ratings: ratings,
    });
    res.json(db.reviewPending[db.reviewPending.length - 1]);
    db.reviewPending.map((rev) => console.log(rev));
    console.log("pending review");
  }
});

app.put("/updateReview", (req, res) => {
  const { id, comments, ratings } = req.body;

  db.review.map((prof) => {
    if (prof.id == id) {
      prof.comments.push(comments);
      prof.ratings.push(ratings);
    }
  });
});

app.get("/deleteReview/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  let deleted = false;
  db.review.map(function (user, index) {
    if (user.id == id) {
      db.review.splice(index, 1);
      deleted = true;
    }
  });
  if (!deleted) {
    console.log("not found");
  } else {
    console.log("success");
  }
});

app.get("/deletePending/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  let deleted = false;
  db.reviewPending.map(function (user, index) {
    if (user.id == id) {
      db.reviewPending.splice(index, 1);
      deleted = true;
    }
  });
  if (!deleted) {
    console.log("not found");
  } else {
    console.log("success");
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
