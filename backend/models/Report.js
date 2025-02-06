const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  pan: String,
  creditScore: Number,
  totalAccounts: Number,
  activeAccounts: Number,
  closedAccounts: Number,
  currentBalance: Number,
  securedBalance: Number,
  unsecuredBalance: Number,
  last7DaysEnquiries: Number,
  creditAccounts: [
    {
      bankName: String,
      accountNumber: String,
      overdueAmount: Number,
      currentBalance: Number,
    },
  ],
});

module.exports = mongoose.model("Report", ReportSchema);
