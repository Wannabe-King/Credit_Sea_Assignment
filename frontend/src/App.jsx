import React from "react";
import FileUpload from "./components/FileUpload";
import ReportList from "./components/ReportList";
import "./App.css";

const App = () => (
  <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded">
    <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 text-center">
      Experian Soft Credit Reports
    </h1>
    <FileUpload />
    <ReportList />
  </div>
);

export default App;
