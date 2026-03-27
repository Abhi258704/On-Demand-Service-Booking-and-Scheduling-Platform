import { Router } from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import {
    createBooking,
    getMyBookings,
    approveBooking,
    cancelBooking,
    getAllBookings,
    updateBookingStatus
} from "../controllers/booking.controller.js"

const router = Router()

// User routes
router.route("/create")
    .post(verifyJwt, createBooking)

router.route("/my-bookings")
    .get(verifyJwt, getMyBookings)

router.route("/allBookings")
    .get(verifyJwt, getAllBookings)


// Admin routes
router.route("/approve/:bookingId")
    .patch(verifyJwt, approveBooking)

router.route("/cancel/:bookingId")
    .patch(verifyJwt, cancelBooking)


    router.route("/status/:bookingId")
.patch(verifyJwt, updateBookingStatus)

export default router