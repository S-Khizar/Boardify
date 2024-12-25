import mongoose from "mongoose";

const hotelModelSchema = new mongoose.Schema({
    HotelName: {
        type: String,
        required: true
    },
    logofileupload: {
        filename: { type: String, required: true },
        path: { type: String, required: true },
        contentType: { type: String, required: true },
    },
    address: {
        type: String
    },
    qrCodeURL: {
        type: String
    },
})

const hotelModel = mongoose.model('hotelModel', hotelModelSchema);

export default hotelModel;