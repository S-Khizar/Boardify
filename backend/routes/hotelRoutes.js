import express from 'express';
import multer from 'multer';
import hotelModel from '../model/hotelModel.js';
import QRCode from 'qrcode';  
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage }); 

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const { HotelName, address } = req.body;

        if (!HotelName || !req.file) {
            return res.status(400).json({ message: "HotelName and file are required" });
        }

        const hotel = new hotelModel({
            HotelName,
            logofileupload: {
                filename: req.file.filename,
                path: req.file.path,
                contentType: req.file.mimetype,
            },
            address
        });

        await hotel.save();

        const hotelInfo = `http://localhost:5173/hotels/${hotel._id}`; 
        const qrCodePath = path.join('uploads', `${hotel._id}-qrcode.png`);

        
        QRCode.toFile(qrCodePath, hotelInfo,async (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to generate QR code" });
            }

            hotel.qrCodeURL = `http://localhost:3000/${qrCodePath}`;


            
                try {
                    await hotel.save();
                    res.status(201).json({
                        message: "File uploaded successfully",
                        hotel: {
                            ...hotel.toObject(),
                            fileURL: `http://localhost:3000/${hotel.logofileupload.path}`, 
                            qrCodeURL: hotel.qrCodeURL, 
                        }
                    });
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }

            
            
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const hotels = await hotelModel.find();

        const hotelsWithFileURLs = hotels.map(hotel => ({
            ...hotel.toObject(),
            fileURL: `http://localhost:3000/${hotel.logofileupload.path}`, 
            qrCodeURL: hotel.qrCodeURL, 
        }));

        res.status(200).json(hotelsWithFileURLs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const hotel = await hotelModel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.status(200).json({
            ...hotel.toObject(),
            fileURL: `http://localhost:3000/${hotel.logofileupload.path}`, 
            qrCodeURL: hotel.qrCodeURL, 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
