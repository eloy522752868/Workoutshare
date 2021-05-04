//creating seeding for user table egon 04/28/2021
const sequelize = require("../config/connection");
const { User, Routines } = require("../models");
const userData = require("./userData.json");
const routineData = require("./routines.json");
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

   const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const routine = await Routines.bulkCreate(routineData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};
seedDatabase();

