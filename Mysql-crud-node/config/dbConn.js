const mysql = require("mysql2/promise");

const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_mysql_crud",
});

module.exports = mysqlPool;
