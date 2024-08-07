const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
    newOrder,
    myOrder,
    getAllOrders,
    deleteOrder,
    updateOrderStatus,
    getSingleOrder
} = require("../controller/orderController");

const router = express.Router();

// post new order 
router.route("/order/new").post(isAuthenticatedUser, newOrder);
// get logged user order 
router.route("/orders/me").get(isAuthenticatedUser, myOrder);
// get all orders by admin 
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
// order details by admin
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
// order details -admin
router.route("/order/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder);
// delete or update order 
router.route("/admin/order/:id")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus);
;

module.exports = router;