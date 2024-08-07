const express = require("express");
const {
    registerUser,
    loginUser,
    logout,
    getUserDetails,
    getAllUser,
    updateUserRole,
    deleteUser,
    getAllUsers,
    updatePassword,
    updateProfile,
    forgotPassword
} = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// register user
router.route("/register").post(registerUser)
// login user 
router.route("/login").post(loginUser);
// logout user 
router.route("/logout").get(logout);
// get logged user 
router.route("/me").get(isAuthenticatedUser, getUserDetails);
// update password 
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
// update profile
router.route("/me/updateProfile").put(isAuthenticatedUser, updateProfile);
// forgot password 
router.route("/password/forgot").post(forgotPassword);
// get all user by admin 
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

// get a single user 
router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);


module.exports = router;