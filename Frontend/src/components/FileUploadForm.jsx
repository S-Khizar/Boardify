import React, { useState } from "react";
import axios from "axios";

const FileUploadForm = () => {
  const [hotelName, setHotelName] = useState("");
  const [file, setFile] = useState(null);
  const [address, setAddress] = useState(""); 
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "hotelName") {
      setHotelName(value);
    } else if (name === "address") {
      setAddress(value); 
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hotelName || !file || !address) {
      setError("Hotel name, address, and file are required!");
      return;
    }

    const formData = new FormData();
    formData.append("HotelName", hotelName);
    formData.append("address", address); 
    formData.append("file", file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/hotels/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("File uploaded successfully!");
      setHotelName("");
      setAddress(""); 
      setFile(null);
    } catch (error) {
      setError("Error uploading file: " + error.response.data.error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upload Hotel Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="hotelName" className="block text-gray-700 font-medium">Hotel Name:</label>
          <input
            type="text"
            id="hotelName"
            name="hotelName"
            value={hotelName}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-gray-700 font-medium">Hotel Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="file" className="block text-gray-700 font-medium">Upload Logo:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUploadForm;
