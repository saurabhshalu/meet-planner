const router = require("express").Router();
const userModel = require("../models/userModel");

router.post("/InsertPlannerDetails", async (req, res) => {
  try {
    if (await checkUniqueLink(req.body.uniqueLink)) {
      const filter = { email: req.body.email };

      const userObj = await userModel.findOne(filter);

      userObj.customURL = req.body.uniqueLink;
      userObj.minimumMeetingDuration = req.body.minimumMeetingDuration;
      userObj.timeslots = req.body.timeslots;

      await userObj.save();

      return res
        .status(200)
        .json({ success: true, message: "User details updated" });
    }

    res
      .status(200)
      .json({ success: false, message: "Link text already exists" });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({
      success: false,
      message: "There seems to be an issue, please try again",
    });
  }
});

router.get("/details/:email", async (req, res) => {
  try {
    const userData = await userModel
      .findOne({ email: req.params.email })
      .select("timeslots customURL minimumMeetingDuration");

    if (!userData) {
      return res
        .status(400)
        .json({ success: false, message: "No User Found." });
    }
    return res.status(200).json({
      success: true,
      message: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again.",
    });
  }

});

async function checkUniqueLink(linkText) {
  try {
    if (!linkText && linkText?.length === 0) return false;

    const userObj = await userModel.findOne({ customURL: linkText });

    if (userObj) {
      return false;
    }

    return true;
  } catch (ex) {
    console.log(ex);
    return false;
  }
}

module.exports = router;
