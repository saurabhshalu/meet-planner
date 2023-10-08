const router = require("express").Router();
const userModel = require("../models/userModel");

router.post("/InsertPlannerDEtails", async (req, res) => {});

async function checkUniqueLink(linkText) {
  try {
  } catch (ex) {
    console.log(ex);
    return false;
  }
}

module.exports = router;
