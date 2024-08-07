const app = require("./app");
const database = require("./config/dbConnection");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const port = process.env.PORT;

// handle uncaught Exception 
process.on("uncaughtException", err => {

    console.log(`Err : ${err.message}`);

    console.log(` Shutting down the server due to uncaught Exception `);

    process.exit(1);
});

// config 

dotenv.config({ path: "./config/config.env" });
// database connection 
database();

// home api 
app.use("/", async (req, res) => {
    res.send("Your server is working!")
})

// cloudinary config 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

// UnHandle Promise Rejection 
process.on("unhandledRejection", err => {

    console.log(`Err : ${err.message}`);

    console.log(` Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });

});