import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllGuests = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editGuest, setEditGuest] = useState(null);
  const [hotelDetails, setHotelDetails] = useState({ HotelName: '', address: '', fileURL: '' });

  useEffect(() => {
    axios
      .get(`api/guest/allguest`)
      .then((response) => {
        setGuests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/guest/guest/${id}`)
      .then((response) => {
        setGuests(guests.filter((guest) => guest._id !== id));
      })
      .catch((error) => {
        setError('Failed to delete guest');
      });
  };

  const handleUpdate = (id) => {
    const updatedGuest = { ...editGuest, hotel: hotelDetails };

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/guest/guest/${id}`, { guest: updatedGuest, hotel: hotelDetails })
      .then((response) => {
        setGuests(
          guests.map((guest) => (guest._id === id ? response.data.data : guest))
        );
        setEditGuest(null);
        setHotelDetails({ HotelName: '', address: '', fileURL: '' });
      })
      .catch((error) => {
        setError('Failed to update guest');
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {loading && <div className="text-center text-xl text-gray-500">Loading...</div>}
      {error && <div className="text-center text-xl text-red-500">{error}</div>}
      {!loading && !error && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Full Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Mobile</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Purpose</th>
                <th className="px-4 py-2 border">Dates</th>
                <th className="px-4 py-2 border">ID Proof</th>
                <th className="px-4 py-2 border">Hotel Name</th>
                <th className="px-4 py-2 border">Hotel Address</th>
                <th className="px-4 py-2 border">Hotel File</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {guests.map((guest) => (
                <tr key={guest._id} className="border-t">
                  <td className="px-4 py-2">{guest.FullName}</td>
                  <td className="px-4 py-2">{guest.emailId}</td>
                  <td className="px-4 py-2">{guest.MobileNumber}</td>
                  <td className="px-4 py-2">{guest.Address || 'Not Provided'}</td>
                  <td className="px-4 py-2">{guest.purposeOfVisit}</td>
                  <td className="px-4 py-2">
                    {new Date(guest.FromDate).toLocaleDateString()} -{' '}
                    {new Date(guest.toDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{guest.IdProofNumber}</td>
                  <td className="px-4 py-2">{guest.hotelDetails?.HotelName || 'Not Provided'}</td>
                  <td className="px-4 py-2">{guest.hotelDetails?.address || 'Not Provided'}</td>
                  <td className="px-4 py-2">
                    {guest.hotelDetails?.fileURL ? (
                      <a
                        href={guest.hotelDetails.fileURL}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Hotel File URL
                      </a>
                    ) : (
                      'Not Provided'
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setEditGuest(guest)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(guest._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit Guest Form */}
          {editGuest && (
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-semibold text-gray-800">Edit Guest</h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="block">Full Name</label>
                  <input
                    type="text"
                    value={editGuest.FullName}
                    onChange={(e) => setEditGuest({ ...editGuest, FullName: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block">Email</label>
                  <input
                    type="email"
                    value={editGuest.emailId}
                    onChange={(e) => setEditGuest({ ...editGuest, emailId: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block">Mobile</label>
                  <input
                    type="text"
                    value={editGuest.MobileNumber}
                    onChange={(e) => setEditGuest({ ...editGuest, MobileNumber: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block">Hotel Name</label>
                  <input
                    type="text"
                    value={hotelDetails.HotelName}
                    onChange={(e) =>
                      setHotelDetails({ ...hotelDetails, HotelName: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block">Hotel Address</label>
                  <input
                    type="text"
                    value={hotelDetails.address}
                    onChange={(e) =>
                      setHotelDetails({ ...hotelDetails, address: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block">Hotel File URL</label>
                  <input
                    type="url"
                    value={hotelDetails.fileURL}
                    onChange={(e) =>
                      setHotelDetails({ ...hotelDetails, fileURL: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <button
                    onClick={() => handleUpdate(editGuest._id)}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full"
                  >
                    Update Guest
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllGuests;
