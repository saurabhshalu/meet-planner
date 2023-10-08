const userModel = require("../models/userModel");

const router = require("express").Router();

const axios = require("axios");

router.get("/:uniqueId", getUserEvents);

async function getUserEvents(req, res) {
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
}

router.get("GetAvailableTimeSlots/:userLink", async (req, res) => {
  try {
    const userLink = req.params.userLink;
    const dayOfWeek = req.query.dayOfWeek;
    const userObj = await userModel.findOne({ customURL: userLink });
    if (!userObj) res.status(400).json({ success: false });
    const timeSlotForDay = userObj?.timeslots[dayOfWeek];
    const duration = userObj.minimumMeetingDuration * 60000; // ms
    const userEvents = await getUserEvents();

    const bookedSlot = [];
    userEvents?.items?.forEach((items) => {
      let data = {
        startTime: "",
        endTime: "",
      };

      data.startTime = items.start.dateTime;
      data.endTime = items.end.dateTime;
      if (areDatesEqual(new Date(data.startTime), startTime)) {
        bookedSlot.push(data);
      }
    });

    const slots = calculateTimeSlots(
      timeSlotForDay.startTime,
      timeSlotForDay.endTime,
      duration,
      bookedSlot
    );

    function areDatesInRange(startDate, endDate, dateRanges) {
      const givenStart = new Date(startDate);
      const givenEnd = new Date(endDate);

      dateRanges.forEach((date) => {
        const start = new Date(date.startTime);
        const end = new Date(date.endTime);

        if (
          (givenStart >= start && givenStart <= end) ||
          (givenEnd >= start && givenEnd <= end)
        ) {
          // if (givenStart >= start && givenEnd <= end) {
          return true; // Start and end dates are within one of the date ranges
        }
      });

      return false; // Start and end dates are not within any of the date ranges
    }

    function areDatesBetweenDatetime(startDatetime, endDatetime, dateList) {
      const startDate = new Date(startDatetime);
      const endDate = new Date(endDatetime);
      let sta = false;
      dateList.filter((date) => {
        const currentStartDate = new Date(date.startTime);
        const currentEndDate = new Date(date.endTime);
        if (
          (currentStartDate >= startDate && currentStartDate <= endDate) ||
          (currentEndDate >= startDate && currentEndDate <= endDate)
        ) {
          sta = true;
        }
      });
      return sta;
    }

    function areDatesEqual(dateA, dateB) {
      return (
        dateA.getFullYear() === dateB.getFullYear() &&
        dateA.getMonth() === dateB.getMonth() &&
        dateA.getDate() === dateB.getDate()
      );
    }

    function calculateTimeSlots(startTime, endTime, slotDuration, bookedSlot) {
      const slots = [];
      let currentTime = new Date(startTime);

      while (currentTime <= endTime) {
        const slotEndTime = new Date(currentTime.getTime() + slotDuration);
        if (!areDatesInRange(currentTime, slotEndTime, bookedSlot)) {
          if (!areDatesBetweenDatetime(currentTime, slotEndTime, bookedSlot)) {
            slots.push({
              startTime: new Date(currentTime),
              endTime: slotEndTime,
            });
          }
        }
        currentTime = slotEndTime;
      }

      res.status(200).json({ success: true, data: slots });
    }
  } catch (ex) {
    return res.status(500).json({
      success: false,
      message: "Cannot fetch user info, please try again later",
    });
  }
});

module.exports = router;
