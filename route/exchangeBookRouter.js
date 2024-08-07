
const express = require("express");
const {
    createExchangeBook,
    getAllExchangeBook,
    getExchangeBookDetails,
    updateExchangeBook,
    deleteExchangeBook,
    getAllExchangeBookByAdmin } = require("../controller/exchangeBookController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// create request exchange book 
router.route("/exchangebook").post(isAuthenticatedUser,createExchangeBook);
// get all request  books 
router.route("/exchangebooks").get(getAllExchangeBook);

// get exchange book details 
router.route("/exchange/:id").get(isAuthenticatedUser,getExchangeBookDetails);
// update or delete a book by admin
router.route("/exchange/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateExchangeBook)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteExchangeBook);

//  get all book by admin 
router.route("/admin/exchangebook").get(isAuthenticatedUser, authorizeRoles("admin"), getAllExchangeBookByAdmin);

module.exports = router;