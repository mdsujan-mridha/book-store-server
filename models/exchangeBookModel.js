const mongoose = require("mongoose");

const exchangeBookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Enter your book name'],
    },
    description: {

        type: String,
        required: [true, 'Enter your book description'],
    },
    author: {
        type: String,
        required: [true, 'Enter your book author'],
    },
    category: {
        type: String,
        required: [true, 'Enter your book category'],
    },
    edition: {
        type: String,
        required: [true, 'Enter your book edition'],
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

})

module.exports = mongoose.model("exchangeBook",exchangeBookSchema);