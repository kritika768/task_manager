const express = require("express");
const { addUser, userLogin,getUsers } = require("../controller/user-controller");

const userRouter = express.Router();

userRouter.post("/signup", addUser);
userRouter.post("/login",userLogin);
userRouter.get("/",getUsers);

module.exports = userRouter;