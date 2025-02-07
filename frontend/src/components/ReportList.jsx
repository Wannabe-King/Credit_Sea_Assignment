import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReports } from "../store/reportSlice";

const ReportCard = ({ report, isExpanded, toggleExpand }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleExpand}>
        <h3 className="text-xl font-semibold text-blue-600">{report.name}</h3>
        <button className="bg-blue-500 text-white px-3 py-1 rounded">
          {isExpanded ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4">
          <div className="mb-3">
            <h4 className="text-lg font-semibold border-b pb-2">Basic Details</h4>
            <p><strong>Mobile:</strong> {report.mobile}</p>
            <p><strong>PAN:</strong> {report.pan}</p>
            <p><strong>Credit Score:</strong> {report.creditScore}</p>
          </div>

          <div className="mb-3">
            <h4 className="text-lg font-semibold border-b pb-2">Report Summary</h4>
            <p><strong>Total Accounts:</strong> {report.totalAccounts}</p>
            <p><strong>Active Accounts:</strong> {report.activeAccounts}</p>
            <p><strong>Closed Accounts:</strong> {report.closedAccounts}</p>
            <p><strong>Current Balance:</strong> ₹{report.currentBalance}</p>
            <p><strong>Secured Balance:</strong> ₹{report.securedBalance}</p>
            <p><strong>Unsecured Balance:</strong> ₹{report.unsecuredBalance}</p>
            <p><strong>Last 7 Days Enquiries:</strong> {report.last7DaysEnquiries}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const ReportList = () => {
  const dispatch = useDispatch();
  const { reports, loading } = useSelector((state) => state.reports);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Credit Reports</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-500 text-center">No reports available.</p>
      ) : (
        reports.map((report, index) => (
          <ReportCard 
            key={index} 
            report={report} 
            isExpanded={expandedIndex === index} 
            toggleExpand={() => toggleExpand(index)} 
          />
        ))
      )}
    </div>
  );
};

export default ReportList;
