import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchReports } from "../store/reportSlice";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/reports/upload", formData);
      alert("File uploaded successfully!");
      dispatch(fetchReports()); // Fetch updated reports
      setFile(null);
    } catch (error) {
      alert("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload XML File</h2>

      <input
        type="file"
        accept=".xml"
        className="border p-2 rounded-md w-full mb-4 cursor-pointer"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        className={`w-full px-4 py-2 text-white font-semibold rounded-md ${
          uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default FileUpload;
