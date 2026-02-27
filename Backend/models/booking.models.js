import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "cancelled", "completed"],
        default: "pending"
    },
    address: {
        type: String,
        required: true
    }

}, { timestamps: true })

export const Booking = mongoose.model("Booking", bookingSchema)