import React, { useState } from "react";
import axios from "axios";

const UploadZone = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return setStatus("Please select a file!");
    setStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", 1); // Example user_id

    try {
      const res = await axios.post("http://localhost:8000/expenses/upload", formData);
      setStatus(`Uploaded: ${res.data.merchant} ₹${res.data.amount}`);
    } catch (err) {
      console.error(err);
      setStatus("Upload failed");
    }
  };

  return (
    <div style={{ padding: "1rem", border: "2px dashed #10b981", borderRadius: "12px", textAlign: "center", color: "#f9fafb" }}>
      <h3>Upload Your Bill</h3>
      <input type="file" onChange={handleFileChange} style={{ margin: "1rem 0" }} />
      <br />
      <button onClick={handleUpload} style={{ padding: "0.5rem 1rem", borderRadius: "8px", background: "#10b981", border: "none", cursor: "pointer" }}>Upload</button>
      <p>{status}</p>
    </div>
  );
};

export default UploadZone;