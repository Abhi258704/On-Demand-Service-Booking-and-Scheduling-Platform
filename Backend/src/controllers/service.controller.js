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

    const { category } = req.query

    const filter = {
        isActive: true
    }

    // 🔥 Apply category filter if exists
    if (category) {
        filter.category = category
    }

    const services = await Service.find(filter)
        .populate("category")

    return res.status(200).json(
        new ApiResponse(200, services, "Services fetched successfully")
    )
})



// Update Service (Admin only)
const updateService = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admin can update service")
    }

    const { serviceId } = req.params
    const { title, description, price, duration, category } = req.body

    const service = await Service.findById(serviceId)

    if (!service) {
        throw new ApiError(404, "Service not found")
    }

    // Check category if provided
    if (category) {
        const categoryExists = await Category.findById(category)

        if (!categoryExists) {
            throw new ApiError(404, "Category not found")
        }

        service.category = category
    }

    if (title) service.title = title
    if (description) service.description = description
    if (price) service.price = price
    if (duration) service.duration = duration

    // Image update
    const imageLocalPath = req.file?.path

    if (imageLocalPath) {
        const uploadedImage = await uploadOnCloudinary(imageLocalPath)

        if (uploadedImage?.url) {
            service.serviceImage = uploadedImage.url
        }
    }

    await service.save()

    return res.status(200).json(
        new ApiResponse(200, service, "Service updated successfully")
    )
})


// Delete Service (Admin only)
const deleteService = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admin can delete service")
    }

    const { serviceId } = req.params

    const service = await Service.findById(serviceId)

    if (!service) {
        throw new ApiError(404, "Service not found")
    }

    // Soft delete
    service.isActive = false
    await service.save()

    return res.status(200).json(
        new ApiResponse(200, {}, "Service deleted successfully")
    )
})

export {
    createService,
    getAllServices,
     updateService,
    deleteService
}