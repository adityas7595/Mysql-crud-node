const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mysqlPool = require("./config/dbConn");

//configure env
dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//route
app.use('/api/student', require('./routes/studentRoutes'));
app.use("/", (req, res) => {
  res.status(200).send("<h1>Mysql Node js Crud App</h1>");
});

const PORT = process.env.PORT || 3004;
//Mysql listen
mysqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("DB Connected Successfully.");

    app.listen(PORT, (req, res) => {
      console.log(`server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
