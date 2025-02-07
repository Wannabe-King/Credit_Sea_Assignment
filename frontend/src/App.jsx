import React from "react";
import FileUpload from "./components/FileUpload";
import ReportList from "./components/ReportList";

const App = () => (
  <div>
    <h1>Experian Soft Credit Reports</h1>
    <FileUpload />
    <ReportList />
  </div>
);

export default App;
