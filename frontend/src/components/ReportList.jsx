import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReports } from "../store/reportSlice";

const ReportList = () => {
  const dispatch = useDispatch();
  const { reports, loading } = useSelector((state) => state.reports);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    dispatch(fetchReports()); // Fetch reports from Redux store
  }, [dispatch]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Credit Reports</h2>

      {loading ? (
        <div className="text-gray-500 text-center py-8">Loading...</div>
      ) : reports.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No reports available.</div>
      ) : (
        <div className="space-y-4">
          {reports.map((report, index) => (
            <div key={index} className="border rounded-lg shadow-md overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpand(index)}
              >
                <span className="text-lg font-medium text-gray-700">{report.name}</span>
                <span className="text-gray-500">{expandedIndex === index ? "▲" : "▼"}</span>
              </div>

              {expandedIndex === index && (
                <div className="border-t p-4">
                  <div className="grid gap-6">
                    {/* Basic Details */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 mb-2">
                        Basic Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>Mobile: {report.mobile}</div>
                        <div>PAN: {report.pan}</div>
                        <div>Credit Score: {report.creditScore}</div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 mb-2">
                        Report Summary
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>Total Accounts: {report.totalAccounts}</div>
                        <div>Active: {report.activeAccounts}</div>
                        <div>Closed: {report.closedAccounts}</div>
                        <div>Balance: ₹{report.currentBalance}</div>
                        <div>Secured: ₹{report.securedBalance}</div>
                        <div>Unsecured: ₹{report.unsecuredBalance}</div>
                      </div>
                    </div>

                    {/* Credit Accounts */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 mb-2">
                        Credit Accounts
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="p-2 text-left">Bank</th>
                              <th className="p-2 text-left">Account</th>
                              <th className="p-2 text-right">Overdue</th>
                              <th className="p-2 text-right">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {report.creditAccounts.map((account, idx) => (
                              <tr key={idx} className="border-t">
                                <td className="p-2">{account.bankName}</td>
                                <td className="p-2">{account.accountNumber}</td>
                                <td className="p-2 text-right text-red-600">
                                  ₹{account.overdueAmount}
                                </td>
                                <td className="p-2 text-right">₹{account.currentBalance}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportList;
