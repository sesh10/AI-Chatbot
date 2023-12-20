import { Router } from "express";
import { validate, signupValidator, loginValidator } from "../utils/validators.js";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user-controllers.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/logout", verifyToken, userLogout);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.post("/signup", validate(signupValidator),  userSignup);

export default userRoutes;