import { Router } from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import {
    createBooking,
    getMyBookings,
    approveBooking,
    cancelBooking
} from "../controllers/booking.controller.js"

const router = Router()

// User routes
router.route("/create")
    .post(verifyJwt, createBooking)

router.route("/my-bookings")
    .get(verifyJwt, getMyBookings)


// Admin routes
router.route("/approve/:bookingId")
    .patch(verifyJwt, approveBooking)

router.route("/cancel/:bookingId")
    .patch(verifyJwt, cancelBooking)

export default router