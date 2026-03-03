import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Booking } from "../models/booking.models.js"
import { Service } from "../models/service.models.js"


// Create Booking (User)
const createBooking = asyncHandler(async (req, res) => {

    const { serviceId, bookingDate, timeSlot, address } = req.body

    if (!serviceId || !bookingDate || !timeSlot || !address) {
        throw new ApiError(400, "All fields are required")
    }

    const service = await Service.findById(serviceId)

    if (!service) {
        throw new ApiError(404, "Service not found")
    }

    const existingBooking = await Booking.findOne({
        service: serviceId,
        bookingDate,
        timeSlot,
        status: { $in: ["approved", "pending"] }
    })

    if (existingBooking) {
        throw new ApiError(409, "Slot already booked")
    }

    const booking = await Booking.create({
        user: req.user._id,
        service: serviceId,
        bookingDate,
        timeSlot,
        address
    })

    return res.status(201).json(
        new ApiResponse(201, booking, "Booking created successfully")
    )
})


// Get My Bookings
const getMyBookings = asyncHandler(async (req, res) => {

    const bookings = await Booking.find({ user: req.user._id })
        .populate("service")

    return res.status(200).json(
        new ApiResponse(200, bookings, "Bookings fetched successfully")
    )
})


// Admin Approve Booking
const approveBooking = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admin can approve bookings")
    }

    const { bookingId } = req.params

    const booking = await Booking.findById(bookingId)

    if (!booking) {
        throw new ApiError(404, "Booking not found")
    }

    booking.status = "approved"
    await booking.save()

    return res.status(200).json(
        new ApiResponse(200, booking, "Booking approved successfully")
    )
})


// Admin Cancel Booking
const cancelBooking = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admin can cancel bookings")
    }

    const { bookingId } = req.params

    const booking = await Booking.findById(bookingId)

    if (!booking) {
        throw new ApiError(404, "Booking not found")
    }

    booking.status = "cancelled"
    await booking.save()

    return res.status(200).json(
        new ApiResponse(200, booking, "Booking cancelled successfully")
    )
})


export {
    createBooking,
    getMyBookings,
    approveBooking,
    cancelBooking
}