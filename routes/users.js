const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => res.render("login"));

router.get("/register", (req, res) => res.render("register"));

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  const passErrorMsg = passwordValidation(password, password2);

  if (passErrorMsg.length > 0) {
    res.render("register", { passErrorMsg, name, email, password, password2 });
  } else {
    res.send("Pass");
  }
});
//Form Validation

function passwordValidation(pass1, pass2) {
  let errors = [];
  if (pass1 !== pass2) {
    errors.push({ msg: "Passwords must match" });
  } else if (pass1.length < 7) {
    errors.push({ msg: "Password must be at least 7 characters" });
  }
  return errors;
}

module.exports = router;
