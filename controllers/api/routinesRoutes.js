const router = require("express").Router();
const { Routines } = require("../../models");
const withAuth = require("../../utils/auth");

//insert of the routines
router.post("/", withAuth, async (req, res) => {
  try {
    console.log("IN THIS LOGIC TO INSERT");
    console.log(req.session.user_id);
    console.log(req.body);
    const newRoutines = await Routines.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRoutines);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//delete of the routines
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const newRoutines = await Routines.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!newRoutines) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(newRoutines);
  } catch (err) {
    console.log("faolerd in API");
    res.status(500).json(err);
  }
});

module.exports = router;
