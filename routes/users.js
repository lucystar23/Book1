const { validate, userModel } = require("../Model/user");
const bcrypt = require("bcrypt");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send({ message: "User with given email already exists" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new userModel({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  }  catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({ message: "Internal Server Error" });
  }
  
});

router.get("/getusers", async (req, res) => {
  try {
    const users = await userModel.find(); // Fetch users from the database
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
