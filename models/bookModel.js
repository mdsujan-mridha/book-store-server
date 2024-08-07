

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product name required"]
    },
    author: {
        type: String,
        required: [true, "Product author required"] 
    },
    description: {
        type: String,
        required: [true, "Enter your product description"]
    },
    price: {
        type: Number,
        required: [true, "Enter your product price"]
    },
    Stock: {
        type: Number,
        required: true,
        default: 1,
    },
    category: {
        type: String,
        required: true,
    },
    images: [
        {
            public_id: {
                type: String,
                // required: true
            },
            url: {
                type: String,
                // required: true,
            },
        },
    ],
 user:{
    type: mongoose.Schema.Types.ObjectId,
     ref: "users",
     required: true
 }

});


module.exports = mongoose.model("books", bookSchema);