import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reports")
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Credit Reports</h2>
      {reports.map((report, index) => (
        <div key={index}>
          <h3>{report.name} - {report.creditScore}</h3>
          <p>Mobile: {report.mobile}</p>
          <p>PAN: {report.pan}</p>
          <p>Total Accounts: {report.totalAccounts}</p>
          <p>Active Accounts: {report.activeAccounts}</p>
          <p>Closed Accounts: {report.closedAccounts}</p>
          <p>Current Balance: ₹{report.currentBalance}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportList;
