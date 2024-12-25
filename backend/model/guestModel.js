import mongoose from 'mongoose'

const guestModelSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    MobileNumber: {
        type: Number
    },
    Address: {
        type: String
    },
    purposeOfVisit: {
        type: String,
        enum: ['Business', 'Personal', 'Tourist']
    },
    FromDate: {
        type: Date,

    },
    toDate: {
        type: Date
    },
    emailId: {
        type: String,
        required: true
    },
    IdProofNumber: {
        type: Number,
        required: true
    },
    hotelDetails: {
        HotelName: { type: String, required: true },
        address: { type: String, required: true },
        fileURL: { type: String },
    }

})

const GuestModel = mongoose.model('GuestModel', guestModelSchema);

export default GuestModel;