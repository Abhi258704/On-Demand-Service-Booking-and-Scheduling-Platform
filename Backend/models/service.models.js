import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number, 
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    serviceImage: {
        type: String
    }

}, { timestamps: true })

export const Service = mongoose.model("Service", serviceSchema)