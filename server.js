const express = require("express");
//const bcrypt = require("bcrypt-nodejs");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
const db = {
  professors: [
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
      ratings: [3, 5, 3, 4],
    },
  ],
};

app.get("/home", (req, res) => {
  res.send(db.professors);
});
app.listen(3000, () => {
  console.log("app is running on port 3000");
});
