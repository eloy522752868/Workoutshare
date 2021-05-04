//association of  models and relationship
//User
const User = require("./User");
const Routines = require("./routines");

User.hasMany(Routines, {
  foreignKey: "user_id",
});

Routines.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Routines };
