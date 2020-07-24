const express = require("express");
const { ModuleResolutionKind } = require("typescript");
const router = express.Router();
const Users = require("./models/user_schema");
const bcrypt = require("bcryptjs"); // การเข้ารหัสให้ password
const jwt = require("./jwt");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const doc = await Users.findOne({ username: username });
    if (doc) {
      const isPasswordValid = await bcrypt.compare(password, doc.password);
      if (isPasswordValid) {
        const payload = {
          id: doc._id,
          level: doc.level,
          username: doc.username,
        };
        const token = jwt.sign(payload);
        res.json({ result: "ok", token, message: "success" });
      } else {
        res.json({ result: "nok", message: "invalid password" });
      }
    } else {
      res.json({ result: "nok", message: "invalid username" });
    }
  } catch (error) {
    res.json({ result: "nok", message: "internal error" });
  }
});

router.post("/register", async (req, res) => {
  // การ callback แบบเก่า ไม่นิยมใช้กันแล้ว
  /*
  Users.create(req.body, (err, doc) => {
    res.json({ result: "ok", account: doc });
  });
  */
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const doc = await Users.create(req.body);
    res.json({ result: "ok", message: doc });
  } catch (err) {
    res.json({ result: "nok", detail: err });
  }
});

module.exports = router;
