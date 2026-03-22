import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Category } from "../models/category.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Service } from "../models/service.models.js"


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


// Update Category (Admin)
const updateCategory = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admin can update category")
    }

    const { categoryId } = req.params
    const { name, description } = req.body

    const category = await Category.findById(categoryId)

    if (!category) {
        throw new ApiError(404, "Category not found")
    }

    // update text fields
    if (name) category.name = name
    if (description) category.description = description

    // update image ONLY if new image uploaded
    if (req.file) {

        const uploadedImage = await uploadOnCloudinary(req.file.path)

        if (!uploadedImage?.url) {
            throw new ApiError(400, "Image upload failed")
        }

        category.coverImage = uploadedImage.url
    }

    await category.save()

    return res.status(200).json(
        new ApiResponse(200, category, "Category updated successfully")
    )
})


// Delete Category (Admin)
const deleteCategory = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admin can delete category")
    }

    const { categoryId } = req.params

    const category = await Category.findById(categoryId)

    if (!category) {
        throw new ApiError(404, "Category not found")
    }

    category.isActive = false
    await category.save()

    return res.status(200).json(
        new ApiResponse(200, category, "Category deleted successfully")
    )
})












const getCategoryById = asyncHandler(async (req, res) => {

    const { categoryId } = req.params

    const category = await Category.findById(categoryId)

    if (!category) {
        throw new ApiError(404, "Category not found")
    }

    return res.status(200).json(
        new ApiResponse(200, category, "Category fetched successfully")
    )

})

const getServicesByCategory = asyncHandler(async (req, res) => {

    const { categoryId } = req.params

    const services = await Service.find({
        category: categoryId
    })

    return res.status(200).json(
        new ApiResponse(200, services, "Services fetched successfully")
    )
})

export {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getServicesByCategory
}