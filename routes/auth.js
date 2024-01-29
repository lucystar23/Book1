// authRoutes.js

const router = require("express").Router();
const { userModel } = require("../Model/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    console.log("Received request:", req.body);
    const { error } = validate(req.body);
    console.log("Validation result:", error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid password or email" });
    }

    // Include role information in the token payload
    const token = jwt.sign({ email: user.email, role: user.email === "admin@gmail.com" ? "admin" : "user" }, "YOU PRIVATE KEY");

    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("password"),
  });
  return schema.validate(data);
};

module.exports = router;
