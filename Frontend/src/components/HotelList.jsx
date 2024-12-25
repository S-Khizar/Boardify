import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/hotels`)
      .then(response => setHotels(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="overflow-x-auto py-6 px-4">
      <table className="min-w-full table-auto bg-white border-collapse border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Hotel Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Image</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Address</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">QR Code</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map(hotel => (
            <tr key={hotel._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-800 border-b">
              
                <Link to={`/hotels/${hotel._id}`} className="text-blue-500 hover:underline">
                  {hotel.HotelName}
                </Link>
              </td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b">
                <img src={hotel.fileURL} alt={hotel.HotelName} className="w-32 h-32 object-cover rounded-md" />
              </td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b">{hotel.address}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b">
                {hotel.qrCodeURL && (
                  <img src={hotel.qrCodeURL} alt="QR Code" className="w-16 h-16 mt-2" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelList;
