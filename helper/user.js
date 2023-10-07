const DB = require("../config/db");
const axios = require("axios");
const CryptoJS = require("crypto-js");

const fetchUserByEmail = async (email) => {
  try {
    const data = await DB.query_promise(
      "SELECT * FROM v_userData WHERE Email = ?",
      [email]
    );
    console.log("data=>", data);
    return data.length > 0;
  } catch (error) {
    return false;
  }
};

const insertUserDetails = async (dataObj) => {
  try {
    const { email, password, displayName, photoUrl, provider } = dataObj;

    const data = await DB.query_promise(
      "INSERT INTO user(Email, Password, DisplayName, PhotoUrl, Provider, isVerified) VALUES (?, ?, ?, ?, ?, ?)",
      [email, password, displayName, photoUrl, provider, false]
    );

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const insertGoogleLoginDetails = async (dataObj) => {
  try {
    const { email, displayName, photoUrl, provider } = dataObj;

    const data = await DB.query_promise(
      "INSERT INTO user(Email, DisplayName, PhotoUrl, Provider, isVerified) VALUES (?, ?, ?, ?, ?)",
      [email, displayName, photoUrl, provider, true]
    );

    if (data.insertedId) {
      await DB.query_promise(
        "INSERT INTO user(UserId, GoogleId) VALUES (?, ?)",
        [data.insertedId, dataObj.googleId]
      );
    }

    return "SUCCESS";
  } catch {
    return "ERROR";
  }
};

const insertMicrosoftLoginDetails = async (dataObj) => {
  try {
    const { email, displayName, photoUrl, provider } = dataObj;

    const data = await DB.query_promise(
      "INSERT INTO user(Email, DisplayName, PhotoUrl, Provider, isVerified) VALUES (?, ?, ?, ?, ?)",
      [email, displayName, photoUrl, provider, true]
    );

    if (data.insertedId) {
      await DB.query_promise(
        "INSERT INTO user(UserId, MicrosoftId) VALUES (?, ?)",
        [data.insertedId, dataObj.microsoftId]
      );
    }

    return "SUCCESS";
  } catch {
    return "ERROR";
  }
};

const fetchUserTokensByEmail = async (email) => {
  const data = (
    await DB.query_promise(
      "SELECT GoogleId, MicrosoftId FROM v_userData WHERE Email = ?",
      [email]
    )
  )[0];
  console.log(data);
};

const fetchUserEvents = async (email) => {
  try {
    const googleData = await _fetchEventsFromGoogle();
    const microsoftData = await _fetchEventsFromMicrosoft();

    let allEvents = [];

    return allEvents;
  } catch {
    return null;
  }
};

const _fetchEventsFromGoogle = async (googleOAuthToken) => {
  try {
    const data = axios.get(`${process.env.GOOGLE_API_BASE_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    return null;
  }
};

const _fetchEventsFromMicrosoft = async (microsoftOAuthToken) => {
  try {
    const data = axios.get(`${process.env.GOOGLE_API_BASE_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    return null;
  }
};

const encryptPassword = async (password) => {
  CryptoJS.SHA256(password + process.env.DB_SALT).toString(CryptoJS.enc.Hex);
};

module.exports = {
  fetchUserByEmail,
  fetchUserEvents,
  insertUserDetails,
  insertGoogleLoginDetails,
  insertMicrosoftLoginDetails,
};
