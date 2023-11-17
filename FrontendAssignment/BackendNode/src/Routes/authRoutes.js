const express = require("express");
const UserModel = require("../Model/user.model");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

app.get("/line", (req, res) => {
  res.send({ msg: "King of the world" });
});

const authFunction = async (user, res) => {
  console.log(user);
  return res.status(200).send({
    msg: "LOGIN SUCCESS",
    auth: true,
    userName: user.name,
    scores: user.scores,
    id: user._id,
  });
};
app.post("/signin", async (req, res) => {
  const { email, pass } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).send({ msg: "User not found", auth: false });
  }
  const hashPass = await bcrypt.compare(pass, user.pass);
  if (user.block) {
    const blocktime = new Date() - new Date(user.lockUntil);
    const hoursLeft = Math.ceil(blocktime / (1000 * 60 * 60));

    if (hoursLeft <= 24) {
      return res.status(503).send({
        msg: `Your account has been blocked, try again after ${
          24 - hoursLeft
        } hours `,
        auth: false,
      });
    } else {
      await UserModel.updateOne(
        { email: email },
        {
          $set: {
            block: false,
            lockUntil: 0,
            loginAttempts: 0,
          },
        }
      );
      if (hashPass) {
        authFunction(user, res);
      }
    }
  }

  if (user.loginAttempts >= 5) {
    await UserModel.updateOne(
      { email: email },
      { $set: { block: true, lockUntil: new Date() } }
    );
    return res.status(503).send({
      msg: "You are blocked for 24 hours",
      auth: false,
    });
  }

  if (!hashPass) {
    await UserModel.updateOne({ email: email }, { $inc: { loginAttempts: 1 } });
    return res.status(401).send({
      msg: "Password is not correct",
      auth: false,
    });
  } else {
    await UserModel.updateOne(
      { email: email },
      {
        $set: {
          loginAttempts: 0,
          lockuntil: 0,
          block: false,
        },
      }
    );

    authFunction(user, res);
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, pass } = req.body;

  try {
    const eUser = await UserModel.findOne({ email });
    if (eUser) {
      return res.status(409).send({ error: "Email already registered" });
    }
    const hash = await bcrypt.hash(pass, 10);
    const user = new UserModel({
      name,
      email,
      pass: hash,
      score: [],
    });
    await user.save();

    return res.status(201).send({ msg: "User Created" });
  } catch (e) {
    return res.status(500).send({ error: "An error occurred during signup" });
  }
});
app.patch("/score/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const scoreToAdd = req.body.score;
    const user = await UserModel.find({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user[0].scores.push(scoreToAdd);

    await user[0].save();
    console.log(user);
    return res.status(200).json({ message: "Score added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = app;
