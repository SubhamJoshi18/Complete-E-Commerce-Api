import userModel from "../models/user.js";
import { authenticatedUser } from "../middleware/authenticaton.js";
export const getAllUser = async (req, res, next) => {
  const findUser = await userModel.aggregate([
    { $match: { role: "admin" } },
    { $group: { _id: { role: "$role" }, totalUser: { $sum: 1 } } },
  ]);
  const findUser1 = await userModel
    .findOne({ role: "admin" })
    .select("-password");
  res.json({
    Success: true,
    message: "Here are the List of the User",
    Description: [{ findUser }],
    Users: {
      findUser1,
    },
  });
};

export const getSingleUser = async (req, res, next) => {
  const newId = req.params.id;
  const findUserById = await userModel.aggregate([
    {
      $match: { _id: newId },
    },
    { $group: { _id: { role: "$role" }, ID_Found: { $sum: 1 } } },
  ]);

  const findactualUser = await userModel
    .findOne({ _id: newId })
    .select("-password");
  res.json({
    Success: true,
    message: "Here is the individual User",
    Description: {
      findUserById,
    },
    User: {
      findactualUser,
    },
  });
};

export const showCurrentUser = (req, res, next) => {
  res.send("Show Current User");
};

export const updateUser = (req, res, next) => {
  res.send("Update User");
};

export const UpdateUserPassword = (req, res, next) => {
  res.send("Update User Password");
};
