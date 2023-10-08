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

      await userModel.saveChanges(userObj);

      return req
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
