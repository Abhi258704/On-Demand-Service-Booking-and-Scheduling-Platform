import express from "express";
import cors from "cors" 
import cookieParser from "cookie-parser"
import categoryRoutes from "./routes/category.routes.js"
import serviceRoutes from "./routes/service.routes.js"
import bookingRoutes from "./routes/booking.routes.js"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// routes import
import userRouter from "./routes/user.routes.js"


// routes declaration

app.use("/api/v1/users", userRouter)

app.use("/api/v1/categories", categoryRoutes)

app.use("/api/v1/services", serviceRoutes)

app.use("/api/v1/bookings", bookingRoutes)


// Global Error Middleware

app.use((err, req, res, next) => {
   res.status(err.statusCode || 500).json({
      success: false,
      message: err.message
   })
})



export { app }