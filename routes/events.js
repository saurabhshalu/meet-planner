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
    if (!myUser.isVerified) {
      return res.status(200).json({
        success: false,
        isVerified: false,
        message: "Please Verify the account to continue.",
      });
    }
    if (!myUser.google.refresh_token) {
      return res.status(200).json({
        success: false,
        isGoogleLinked: false,
        isVerified: true,
        message: "Google Account Not Linked, Please Link the Account First.",
      });
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

    // const MY_URL = `https://www.googleapis.com/calendar/v3/calendars/${myUser.email}/events`;
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 3);
    endDate.setHours(23, 59, 59);

    const MY_URL = `https://www.googleapis.com/calendar/v3/calendars/${
      myUser.email
    }/events?timeMin=${startDate.toISOString()}&timeMax=${endDate.toISOString()}`;

    console.log(MY_URL);

    const { data } = await axios.get(MY_URL, {
      headers: {
        Authorization: `Bearer ${myUser.google.access_token}`,
      },
    });
    res.status(200).json({
      success: true,
      message: data?.items?.filter(
        (item) =>
          item.end.hasOwnProperty("dateTime") &&
          item.start.hasOwnProperty("dateTime")
      ),
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
});

module.exports = router;
