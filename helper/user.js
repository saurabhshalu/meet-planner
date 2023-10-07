const DB = require("../config/db");

const fetchUserByEmail = async (email) => {
  const data = await DB.query_promise("SELECT * FROM user", []);
  console.log(data);
};

fetchUserByEmail("test");
