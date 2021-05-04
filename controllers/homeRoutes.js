const router = require("express").Router();
const { User, Routines } = require("../models");
const withAuth = require("../utils/auth");

// Route to root/homepage
router.get("/home", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Routines }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render("home", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// go home withAuth middleware to prevent access to route
router.get("/", async (req, res) => {
  try {
    const RoutineData = await Routines.findAll({
      include: [{ model: User }],
    });
    const routines = RoutineData.map((project) => project.get({ plain: true }));
    console.log(routines);
    res.render("homepage", {
      routines,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to profile if logged in
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/home");
    return;
  }
  res.render("login");
});

// Route to an individual exercise page
router.get("/exercise/:id", (req, res) => {
  try {
    res.render("exercise", {
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
