import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Category } from "../models/category.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


// Create Category (Admin only)
const createCategory = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admin can create category")
    }

    const { name, description } = req.body

    if (!name) {
        throw new ApiError(400, "Category name is required")
    }

    const existingCategory = await Category.findOne({ name })

    if (existingCategory) {
        throw new ApiError(409, "Category already exists")
    }

    // Cover image
    const coverImageLocalPath = req.file?.path

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image is required")
    }

    const uploadedImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!uploadedImage?.url) {
        throw new ApiError(400, "Error uploading cover image")
    }

    const category = await Category.create({
        name,
        description,
        coverImage: uploadedImage.url
    })

    return res.status(201).json(
        new ApiResponse(201, category, "Category created successfully")
    )
})


// Get All Categories
const getAllCategories = asyncHandler(async (req, res) => {

    const categories = await Category.find({ isActive: true })

    return res.status(200).json(
        new ApiResponse(200, categories, "Categories fetched successfully")
    )
})


export {
    createCategory,
    getAllCategories
}