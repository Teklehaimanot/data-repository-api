const express = require("express");
const userController = require('./user.controller')

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.json({
        userRouter: "it is working"
    });
});

/*
// @params none
// body username, password, name
// method post
//auth none
//signup user
*/
userRouter.post("/", userController.createUser);

/*
// @params none
// body username, password
// method post
//auth none
//signin user
*/
userRouter.post("/auth", userController.loginUser);



module.exports = userRouter;