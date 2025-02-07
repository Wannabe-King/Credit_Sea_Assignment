import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/api/reports/upload", formData)
      .then(() => alert("File uploaded successfully!"))
      .catch(() => alert("Error uploading file."));
  };

  return (
    <div>
      <input type="file" accept=".xml" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
