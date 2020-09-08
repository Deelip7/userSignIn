const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/User");

router.get("/login", (req, res) => res.render("login"));

router.get("/register", (req, res) => res.render("register"));

//Get form values when user submit
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  const passErrorMsg = passwordValidation(password, password2);

  if (passErrorMsg.length > 0) {
    //Form failed validation
    res.render("register", { passErrorMsg, name, email, password, password2 });
  } else {
    //Form passed validation
    User.findOne({ email: email }).then((user) => {
      if (user) {
        passErrorMsg = "Email already exists";
        res.render("register", { passErrorMsg, name, email, password, password2 });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        //bcrypt password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            //Save new User
            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "You have successfully registered");
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

//Form Validation
function passwordValidation(pass1, pass2) {
  let errors = "";
  if (pass1 !== pass2) {
    // errors.push({ msg: "Passwords must match" });
    errors = "Passwords must match";
  } else if (pass1.length < 7) {
    // errors.push({ msg: "Password must be at least 7 characters" });
    errors = "Password must be at least 7 characters";
  }
  return errors;
}

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
