import { Router } from "express";
import {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  UpdateUserPassword,
} from "../controller/user.controller.js";
import { authenticatedUser } from "../middleware/authenticaton.js";
const userRouter = Router();

userRouter.route("/").get(authenticatedUser, getAllUser);
userRouter.route("/:id").get(getSingleUser);
userRouter.route("/showMe").get(showCurrentUser);
userRouter.route("/updateUserPassword").post(UpdateUserPassword);
userRouter.route("/updateUser").post(updateUser);

export default userRouter;
