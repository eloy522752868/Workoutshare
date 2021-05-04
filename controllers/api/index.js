const router = require("express").Router();
const userRoutes = require("./userRoutes");
const routinesRoutes = require("./routinesRoutes");

//added routines api line 7 path egon 04/30/2021
router.use("/users", userRoutes);
router.use("/routines", routinesRoutes);

module.exports = router;
