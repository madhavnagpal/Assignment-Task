const Sequelize = require("sequelize");
let db;
if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL);
} else {
  db = new Sequelize({
    dialect: "sqlite",
    storage: __dirname + "/myDb.db",
  });
}

const Users = db.define("users", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

const Projects = db.define("projects", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.DataTypes.ENUM,
    values: ["active", "inactive", "declined", "completed"],
    allowNull: false,
  },
});

const Tasks = db.define("tasks", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.DataTypes.ENUM,
    values: ["active", "inactive", "declined", "completed"],
    allowNull: false,
  },
  score: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
});

Users.hasMany(Projects);
Projects.belongsTo(Users);

Users.hasMany(Tasks);
Tasks.belongsTo(Users);

Projects.hasOne(Tasks);
Tasks.belongsTo(Projects);

dataSeeding();

module.exports = {
  db,
  Users,
  Projects,
  Tasks,
};

async function dataSeeding() {
  await db.sync();
  await Users.bulkCreate([
    { name: "one", surname: "eeeee", email: "one@one.one" },
    { name: "two", surname: "dddd", email: "two@two.two" },
    { name: "three", surname: "cccc", email: "three@three.three" },
    { name: "four", surname: "bbbb", email: "four@four.four" },
    { name: "five", surname: "aaaa", email: "five@five.five" },
  ]);
  await Projects.bulkCreate([
    { name: "1 project one", body: "of user one", status: "active", userId: 1 },
    {
      name: "2 project two",
      body: "of user one",
      status: "inactive",
      userId: 1,
    },
    { name: "3 project one", body: "of user two", status: "active", userId: 2 },
    {
      name: "4 project one",
      body: "of user three",
      status: "active",
      userId: 3,
    },
    {
      name: "5 project one",
      body: "body four",
      status: "completed",
      userId: 4,
    },
  ]);
  await Tasks.bulkCreate([
    {
      name: "task one",
      description: "of user 1 , project 1",
      score: 90,
      status: "active",
      userId: 1,
      projectId: 1,
    },
    {
      name: "task two",
      description: "of user 1 , project 2",
      score: 90,
      status: "active",
      userId: 1,
      projectId: 2,
    },
    {
      name: "task three",
      description: "of user 4 , project 5",
      score: 90,
      status: "active",
      userId: 4,
      projectId: 5,
    },
  ]);
}
