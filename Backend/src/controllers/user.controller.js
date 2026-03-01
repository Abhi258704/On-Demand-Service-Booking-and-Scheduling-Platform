import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"




const registerUser = asyncHandler(async (req, res) => {


    const { fullName, email, username, password } = req.body
    console.log("email: ", email)


    // validation

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields required")
    }


    // checking if user already exist

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "email or username already exist")
    }



    // Cover image or pfp

    const PfpLocalPath = req.files?.pfp[0]?.path;

    if (!PfpLocalPath) {
        throw new ApiError(400, "Profile Pic is required");
    }


    // upload on cloud

    const pfp = await uploadOnCloudinary(PfpLocalPath)

    if (!pfp) {
        throw new ApiError(400, "Profile Pic is required");
    }


    // save data in db

    const user = await User.create({
        fullName,
        pfp: pfp.url,
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser){
        throw new ApiError(500, "Something went wrong while reg user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Reg successfully")
    )

})



export { registerUser }