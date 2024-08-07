const catchAsyncError = require("../middleware/catchAsyncError");
const Book = require("../models/bookModel");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/ApiFeatures");

// create book
exports.createBook = catchAsyncError(async (req, res, next) => {
    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }
    const imageLink = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "books",
        });
        imageLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }
    req.body.images = imageLink;
    req.body.user = req.user.id;


    const book = await Book.create(req.body);

    res.status(201).json({
        success: true,
        book,
    })

});

// get all books 
exports.getAllBooks = catchAsyncError(async (req, res, next) => {

    const resultPerPage = 9;
    const totalBooks = await Book.countDocuments();
    const apiFeature = new ApiFeatures(Book.find(), req.query)
        .search()
        .filter()

    let sellBooks = await apiFeature.query;
    let filteredBooks = sellBooks.length;
    apiFeature.pagination(resultPerPage);
    sellBooks = await apiFeature.query.clone();

    res.status(200).json({
        success: true,
        totalBooks,
        filteredBooks,
        resultPerPage,
        sellBooks,
    })
})

// get book details 
exports.getBookDetails = catchAsyncError(async (req, res, next) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return next(new ErrorHandler("No book found with that ID", 404))
    }
    res.status(200).json({
        success: true,
        book
    })
});

// update book by admin 
exports.updateBook = catchAsyncError(async (req, res, next) => {
    let book = await Book.findById(req.params.id);
    if (!book) {
        return next(new ErrorHandler("No book found with that ID", 404))
    }
    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        book
    })
})

// delete book 
exports.deleteBook = catchAsyncError(async (req, res, next) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return next(new ErrorHandler("No book found with that ID", 404))
    }
    await book.deleteOne();
    res.status(204).json({
        success: true,
        message: "Book deleted successfully"
    })
})

// get all book by admin 
exports.getAllBookByAdmin = catchAsyncError(async (req, res, next) => {
    const books = await Book.find();
    res.status(200).json({
        success: true,
        books
    })
})