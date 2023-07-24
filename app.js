require("dotenv").config()
require("./config/conn")
const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const fileUpload = require("express-fileupload")
const { auth } = require("express-openid-connect")
const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: "http://localhost:3000",
    clientID: "zqR5U2so4oyZcyV84WZ8ii03GelLSTQg",
    issuerBaseURL: "https://dev-yumfn7jyqrydl3eq.us.auth0.com/",
    secret: "LONG_RANDOM_STRING",
}
const userRoute = require("./routes/userRoute")
const homeRoute = require("./routes/homeRoute")
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.set("view engine", "hbs")
app.set("views", "./templates/views")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
)

app.use(auth(config))

//routes
app.use("/", userRoute)
app.use("/", homeRoute)

module.exports = app
