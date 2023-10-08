const mysql = require("mysql");

console.log(process.env.MYSQL_SERVER);

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_SERVER,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "utc",
});

const DB = (function () {
  function _query(query, params, callback) {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.error("ERROR: releasing connection.");
        connection.release();
        callback(null, err);
        throw err;
      }

      connection.query(query, params, function (err, rows) {
        connection.release();
        if (!err) {
          callback(rows);
        } else {
          callback(null, err);
        }
      });
    });
  }

  const _query_promise = (query, params) => {
    return new Promise((resolve, reject) => {
      console.log(query, params);
      pool.getConnection(function (err, connection) {
        if (err) {
          console.error("ERROR: releasing connection.", err);
          connection.release();
          reject(err);
        }

        connection.query(query, params, function (err, rows) {
          connection.release();
          if (!err) {
            resolve(rows);
          } else {
            reject(err);
          }
        });
      });
    });
  };

  return {
    query: _query,
    query_promise: _query_promise,
  };
})();

module.exports = DB;
