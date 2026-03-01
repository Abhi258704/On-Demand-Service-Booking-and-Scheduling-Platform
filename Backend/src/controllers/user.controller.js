import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"




const generateAccessAndRefreshToken = async(userId)  => {

    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken
        const refreshToken = user.generateRefreshToken

        user.refreshToken  = refreshToken
        await user.save({ validateBeforeSave: false})

        return {accessToken, refreshToken}
        
    } catch (error) {
        throw new ApiError(500, "stww while generating access and refrsh tokens")
    }
}


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

    const existedUser = await User.findOne({
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

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while reg user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Reg successfully")
    )

})


const loginUser = asyncHandler(async (req, res) => {


    // data
    const { email, username, password } = req.body

    if (!username || !email) {
        throw new ApiError(400, "username or email is required")
    }

    // check or find in db

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "user does not exist")
    }
    
    
    // check password

    const isPasswordValid = await user.isPasswordCorrect(password)
    
    if (!isPasswordValid) {
        throw new ApiError(401, "incorrect password")
    }


    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUSer = await User.findById(user._id).select("-password -refreshToken")

    
    // cookies

    const options = {
        httpOnly: true,
        secure: true
    }


    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, "user logged in successfully")
    )
})


const logoutUser  =asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "logged out successfully"))   
})






export {
    registerUser,
    loginUser,
    logoutUser
}