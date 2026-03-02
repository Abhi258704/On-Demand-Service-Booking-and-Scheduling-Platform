import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"




const generateAccessAndRefreshToken = async(userId)  => {

    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

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

    if (!(username || email)) {
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
        secure: false
    }


    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, "user logged in successfully")
    )
})


const logoutUser  = asyncHandler(async (req, res) => {
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
        secure: false
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "logged out successfully"))   
})


const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken){
        throw new ApiError(401, "unauthorized request")
    }


    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
    const user = await User.findById(decodedToken?._id)

    if (!user) { 
        throw new ApiError(401, "invalid refresh token")
    }

    if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Refresh token is expired or used")
    }

    const options = {
        httpOnly: true
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {accessToken, refreshToken},
            "Acccess Token refrshed"
        )
    )

})


const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPass, newPass} = req.body

    const user  = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPass)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "invalid pass")
    }

    user.password = newPass

    await user.save({validateBeforeSave: false})

    return res.status(200)
    .json(new ApiResponse(200, {}, "pass changed successfully"))
     

})


const getCurrentUser = asyncHandler(async(req, res) => {
    return res.status(200)
    .json(200, req.user, "Current user fetched successfully")
})


const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullName, email} = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields required")
    }

    const user = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            fullName,
            email
        }
    }, {new: true}).select("-password")

    return res.status(200)
    .json(new ApiResponse(200, user, "details updated"))

})


const updatePfp = asyncHandler(async(req, res) => {

    const pfpLocalPath = req.file?.path

    if(!pfpLocalPath) {
        throw new ApiError(400, "pfp file is missing")
    }

    const pfp = await uploadOnCloudinary(pfpLocalPath)

    if (!pfp.url) {
        throw new ApiError(400, "error while uploading")
    }


    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set: {
                pfp: pfp.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res.status(200)
    .json(new ApiResponse(200, user, "pfp updated successfully"))

})



export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updatePfp
}