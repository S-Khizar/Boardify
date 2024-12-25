import express from 'express';
import GuestModel from '../model/guestModel.js';

const router = express.Router();

router.post("/guestdata", async (req, res) => {
    try {
      const { guest, hotel } = req.body;
  
      if (!guest || !hotel) {
        return res.status(400).json({ error: "Guest or Hotel details are missing." });
      }
  
     
      const newGuest = new GuestModel({
        ...guest,
        hotelDetails: {
          HotelName: hotel.HotelName,
          address: hotel.address,
          fileURL: hotel.fileURL,
        },
      });
  
      const savedGuest = await newGuest.save();
      res.status(201).json({ message: "Guest data saved successfully", data: savedGuest });
    } catch (error) {
      console.error("Error saving guest data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get('/allguest',async(req,res)=>{
    try {
        const data=await GuestModel.find();
        res.status(200).json(data);
    } catch (error) {
        console.log("error fetching all the hotel data",error)
    }
  })

router.put('/guest/:id', async (req, res) => {
    const { id } = req.params;
    const { guest, hotel } = req.body;
  
    try {
      // Validate the request data
      if (!guest || !hotel) {
        return res.status(400).json({ error: 'Guest or Hotel details are missing.' });
      }
  
      const updatedGuest = await GuestModel.findByIdAndUpdate(
        id,
        {
          ...guest,
          hotelDetails: {
            HotelName: hotel.HotelName,
            address: hotel.address,
            fileURL: hotel.fileURL,
          },
        },
        { new: true }
      );
  
      if (!updatedGuest) {
        return res.status(404).json({ error: 'Guest not found' });
      }
  
      res.status(200).json({ message: 'Guest data updated successfully', data: updatedGuest });
    } catch (error) {
      console.error('Error updating guest data:', error);
      res.status(500).json({ error: 'Failed to update guest data' });
    }
  });
  
  router.delete('/guest/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedGuest = await GuestModel.findByIdAndDelete(id);
  
      if (!deletedGuest) {
        return res.status(404).json({ error: 'Guest not found' });
      }
  
      res.status(200).json({ message: 'Guest deleted successfully' });
    } catch (error) {
      console.error('Error deleting guest data:', error);
      res.status(500).json({ error: 'Failed to delete guest data' });
    }
  });
  
  

export default router;
