const express = require("express");
const multer = require("multer");
const xml2js = require("xml2js");
const fs = require("fs");
const Report = require("../models/Report");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file || req.file.mimetype !== "text/xml") {
    return res
      .status(400)
      .json({ error: "Invalid file format. Upload an XML file." });
  }

  const xmlData = fs.readFileSync(req.file.path, "utf-8");
  xml2js.parseString(xmlData, async (err, result) => {
    if (err) return res.status(500).json({ error: "Error parsing XML" });

    const creditProfile = result.INProfileResponse;
    const basicDetails =
      creditProfile.Current_Application[0].Current_Application_Details[0]
        .Current_Applicant_Details[0];

    const report = new Report({
      name: `${basicDetails.First_Name[0]} ${basicDetails.Last_Name[0]}`,
      mobile: basicDetails.MobilePhoneNumber[0],
      pan: creditProfile.CAIS_Account[0].CAIS_Account_DETAILS[0]
        .CAIS_Holder_ID_Details[0].Income_TAX_PAN[0],
      creditScore: parseInt(creditProfile.SCORE[0].BureauScore[0]),
      totalAccounts: parseInt(
        creditProfile.CAIS_Account[0].CAIS_Summary[0].Credit_Account[0]
          .CreditAccountTotal[0]
      ),
      activeAccounts: parseInt(
        creditProfile.CAIS_Account[0].CAIS_Summary[0].Credit_Account[0]
          .CreditAccountActive[0]
      ),
      closedAccounts: parseInt(
        creditProfile.CAIS_Account[0].CAIS_Summary[0].Credit_Account[0]
          .CreditAccountClosed[0]
      ),
      currentBalance: parseInt(
        creditProfile.CAIS_Account[0].CAIS_Summary[0]
          .Total_Outstanding_Balance[0].Outstanding_Balance_All[0]
      ),
      securedBalance: parseInt(
        creditProfile.CAIS_Account[0].CAIS_Summary[0]
          .Total_Outstanding_Balance[0].Outstanding_Balance_Secured[0]
      ),
      unsecuredBalance: parseInt(
        creditProfile.CAIS_Account[0].CAIS_Summary[0]
          .Total_Outstanding_Balance[0].Outstanding_Balance_UnSecured[0]
      ),
      last7DaysEnquiries: parseInt(
        creditProfile.TotalCAPS_Summary[0].TotalCAPSLast7Days[0]
      ),
      creditAccounts: creditProfile.CAIS_Account[0].CAIS_Account_DETAILS.map(
        (acc) => ({
          bankName: acc.Subscriber_Name[0],
          accountNumber: acc.Account_Number[0],
          overdueAmount: parseInt(acc.Amount_Past_Due[0] || 0),
          currentBalance: parseInt(acc.Current_Balance[0] || 0),
        })
      ),
    });

    await report.save();
    res.status(201).json({ message: "Report uploaded successfully!" });
  });
});

router.get("/", async (req, res) => {
  const reports = await Report.find();
  res.json(reports);
});

module.exports = router;
