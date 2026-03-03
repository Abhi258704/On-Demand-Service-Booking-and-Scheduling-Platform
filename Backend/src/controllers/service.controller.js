import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Service } from "../models/service.models.js"
import { Category } from "../models/category.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


// Create Service (Admin Only)
const createService = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admin can create service")
    }

    const { title, description, price, duration, category } = req.body

    if (!title || !price || !duration || !category) {
        throw new ApiError(400, "Required fields missing")
    }

    const categoryExists = await Category.findOne({
        _id: category,
        isActive: true
    })

    if (!categoryExists) {
        throw new ApiError(404, "Category not found")
    }

    const imageLocalPath = req.file?.path
    let uploadedImage;

    if (imageLocalPath) {
        uploadedImage = await uploadOnCloudinary(imageLocalPath)
    }

    const service = await Service.create({
        title,
        description,
        price,
        duration,
        category,
        serviceImage: uploadedImage?.url || ""
    })

    return res.status(201).json(
        new ApiResponse(201, service, "Service created successfully")
    )
})


// Get All Services
const getAllServices = asyncHandler(async (req, res) => {

    const services = await Service.find({ isActive: true })
        .populate("category")

    return res.status(200).json(
        new ApiResponse(200, services, "Services fetched successfully")
    )
})

export {
    createService,
    getAllServices
}