const express = require("express");
const { createBook, getAllBooks, getBookDetails, updateBook, deleteBook, getAllBookByAdmin } = require("../controller/bookController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/book/sell").post(isAuthenticatedUser, createBook);

// get all book 
router.route("/books").get(getAllBooks);
//  get book details 
router.route("/book/:id").get(getBookDetails);
// update or delete a book by admin 
router.route("/book/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateBook)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBook);
;
// get all book  admin
router.route("/books/admin").get(isAuthenticatedUser, authorizeRoles("admin"), getAllBookByAdmin);





module.exports = router;