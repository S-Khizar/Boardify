import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const HotelLandingPage = () => {
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState(null);
  const [guestData, setGuestData] = useState({
    FullName: "",
    MobileNumber: "",
    Address: "",
    purposeOfVisit: "",
    FromDate: "",
    toDate: "",
    emailId: "",
    IdProofNumber: "",
  });
  const [formMessage, setFormMessage] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/hotels/${id}`);
        setHotel(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchHotelData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestData({ ...guestData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!hotel) {
      setFormMessage("Error: Hotel details are not available. Please refresh the page.");
      return;
    }

    const payload = {
      guest: guestData,
      hotel: {
        HotelName: hotel.HotelName,
        address: hotel.address,
        fileURL: hotel.fileURL, 
      },
    };
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/guest/guestdata`, payload);
      setFormMessage("Guest data and hotel details saved successfully!");
      setGuestData({
        FullName: "",
        MobileNumber: "",
        Address: "",
        purposeOfVisit: "",
        FromDate: "",
        toDate: "",
        emailId: "",
        IdProofNumber: "",
      });
    } catch (err) {
      setFormMessage("Error saving data. Please try again.");
    }
  };
  

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Hotel Details */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full mb-8">
        <div className="flex justify-center">
          <img
            src={hotel.fileURL}
            alt={`${hotel.HotelName} Logo`}
            className="w-40 h-40 object-cover rounded-full border-4 border-gray-200 shadow-md"
          />
        </div>
        <div className="text-center mt-6">
          <h1 className="text-4xl font-extrabold text-gray-800">{hotel.HotelName}</h1>
          <p className="text-gray-600 text-lg mt-3">{hotel.address || "Address not available"}</p>
        </div>
        <div className="mt-8 flex justify-center">
          {hotel.qrCodeURL && (
            <a
              href={hotel.qrCodeURL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
            >
              View QR Code
            </a>
          )}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Guest Details Form</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="FullName"
              value={guestData.FullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="border rounded-lg p-2 w-full"
              required
            />
            <input
              type="number"
              name="MobileNumber"
              value={guestData.MobileNumber}
              onChange={handleInputChange}
              placeholder="Mobile Number"
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <input
            type="text"
            name="Address"
            value={guestData.Address}
            onChange={handleInputChange}
            placeholder="Address"
            className="border rounded-lg p-2 w-full"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="purposeOfVisit"
              value={guestData.purposeOfVisit}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
              required
            >
              <option value="">Purpose of Visit</option>
              <option value="Business">Business</option>
              <option value="Personal">Personal</option>
              <option value="Tourist">Tourist</option>
            </select>
            <input
              type="email"
              name="emailId"
              value={guestData.emailId}
              onChange={handleInputChange}
              placeholder="Email ID"
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="FromDate"
              value={guestData.FromDate}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            />
            <input
              type="date"
              name="toDate"
              value={guestData.toDate}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <input
            type="number"
            name="IdProofNumber"
            value={guestData.IdProofNumber}
            onChange={handleInputChange}
            placeholder="ID Proof Number"
            className="border rounded-lg p-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 w-full"
          >
            Submit
          </button>
        </form>
        {formMessage && (
          <div className="text-center text-gray-700 mt-4">{formMessage}</div>
        )}
      </div>
    </div>
  );
};

export default HotelLandingPage;
