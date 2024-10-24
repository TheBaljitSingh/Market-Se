const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile,getSingleUser, getAllUsers, updateUserRole, deleteUser, revalidate } = require("../Controllers/userController");
const {isAuthenticatedUser, authorizeRoles, isValidate} = require("../middleware/auth");


const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword)
router.route("/logout").get(logoutUser);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
.put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);
// router.route("/revalidate").get(isValidate);


module.exports = router;