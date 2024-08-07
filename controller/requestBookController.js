const catchAsyncError = require("../middleware/catchAsyncError");
const RequestBook = require("../models/bookRequestModel");
const ApiFeatures = require("../utils/ApiFeatures");

const cloudinary = require("cloudinary");
// create request 
exports.createRequest = catchAsyncError(async (req, res, next) => {

    // let images = [];
    // if (typeof req.body.images === "string") {
    //     images.push(req.body.images);
    // } else {
    //     images = req.body.images;
    // }
    // const imageLink = [];
    // for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //         folder: "books",
    //     });
    //     imageLink.push({
    //         public_id: result.public_id,
    //         url: result.secure_url,
    //     });
    // }
    // req.body.images = imageLink;
    // req.body.user = req.user.id;

    const requestBook = await RequestBook.create(req.body);
    res.status(201).json({
        success: true,
        requestBook
    })
});
;
// get all request
exports.getAllRequestBook = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 10;
    const totalBooks = await RequestBook.countDocuments();
    const apiFeature = new ApiFeatures(RequestBook.find(), req.query)
        .search()
        .filter()

    let requestBooks = await apiFeature.query;
    let filteredBooks = requestBooks.length;
    apiFeature.pagination(resultPerPage);
    requestBooks = await apiFeature.query.clone();

    res.status(200).json({
        success: true,
        totalBooks,
        requestBooks,
        filteredBooks,
        resultPerPage

    })
});

// get product details 
exports.getRequestBookDetails = catchAsyncError(async (req, res, next) => {
    const requestBook = await RequestBook.findById(req.params.id);
    if (!requestBook) {
        return next(new AppError("No book found with that ID", 404))
    }
    res.status(200).json({
        success: true,
        requestBook
    })
});

// update book by admin 
exports.updateRequestBook = catchAsyncError(async (req, res, next) => {
    let requestBook = await RequestBook.findById(req.params.id);

    if (!requestBook) {
        return next(new ErrorHandler("requestBook not found", 404))
    }
    requestBook = await RequestBook.findByIdAndUpdate(req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    res.status(200).json({
        success: true,
        requestBook
    })
});

// delete book 
exports.deleteRequestBook = catchAsyncError(async (req, res, next) => {
    const requestBook = await RequestBook.findById(req.params.id);
    if (!requestBook) {
        return next(new AppError("No book found with that ID", 404))
    }
    await requestBook.deleteOne();
    res.status(204).json({
        success: true,
        requestBook
    })
});

// get all book request admin
exports.getAllBookRequestAdmin = catchAsyncError(async (req, res, next) => {
    const requestBook = await RequestBook.find();
    res.status(200).json({
        success: true,
        requestBook
    })
})