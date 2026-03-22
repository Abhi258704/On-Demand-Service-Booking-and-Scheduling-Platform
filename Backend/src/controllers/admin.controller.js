import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"

import { User } from "../models/user.models.js"
import { Service } from "../models/service.models.js"
import { Category } from "../models/category.models.js"
import { Booking } from "../models/booking.models.js"

const getAdminStats = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admin can access stats")
    }

    const users = await User.countDocuments()
    const services = await Service.countDocuments()
    const categories = await Category.countDocuments()
    const bookings = await Booking.countDocuments()

    return res.status(200).json(
        new ApiResponse(
            200,
            { users, services, categories, bookings },
            "Admin stats fetched successfully"
        )
    )
})

export { getAdminStats }