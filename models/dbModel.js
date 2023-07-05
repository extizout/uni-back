const db = require("../config/dbConfig");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: db.host,
  user: db.user,
  password: db.password,
});

exports.connection;

exports.executeQuery = async function executeQuery(
  query,
  successMessage,
  value
) {
  connection.connect((err) => {
    if (err) {
      console.error("Error: ", err);
    }
  });
  return connection
    .promise()
    .query(query, value)
    .then(([results]) => {
      if(successMessage === null){
        return results
      }
      console.log(successMessage);
      return results;
    })
    .catch((err) => {
      throw err;
    });
}
