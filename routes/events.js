const userModel = require("../models/userModel");

const router = require("express").Router();

const axios = require("axios");

router.get("/:uniqueId", async (req, res) => {
  try {
    const myUser = await userModel.findOne({ email: req.params.uniqueId }); //change email to uniqueId
    console.log("MY_USER=>", myUser);
    if (!myUser.google) {
      return res
        .status(404)
        .json({ success: false, message: "No Events Found." });
    }
    if (
      (myUser.google.expiry_date &&
        new Date(myUser.google.expiry_date) <= new Date()) ||
      !myUser.google.expiry_date
    ) {
      //REFRESH TOKEN:
      console.log("REFRESHING the TOKEN");
      const { data: responseData } = await axios.post(
        "https://oauth2.googleapis.com/token",
        {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          refresh_token: myUser.google.refresh_token,
          grant_type: "refresh_token",
        }
      );

      console.log(
        "REFRESHED TOKEN IS: =>",
        responseData,
        responseData.access_token
      );

      const expiry_date = new Date();
      expiry_date.setSeconds(
        expiry_date.getSeconds() - 60 + responseData.expires_in
      );

      myUser.google.access_token = responseData.access_token;
      myUser.google.expiry_date = expiry_date;
      await myUser.save();
    }
    const { data } = await axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/${myUser.email}/events`,
      {
        headers: {
          Authorization: `Bearer ${myUser.google.access_token}`,
        },
      }
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
});

module.exports = router;
