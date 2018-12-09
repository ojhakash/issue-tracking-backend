const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const appConfig = require("./../../config/appConfig");
const auth = require("./../middlewares/auth");

module.exports.setRouter = app => {
    let baseUrl = `${appConfig.apiVersion}/users`;

    // params: authToken.

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/view/all api for get all users.
     *
     * @apiParam {authToken} authToken authToken of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "All User Details Found",
            "status": 200,
            "data": [
                {
                    "userId": "_3kGgiCCB",
                    "firstName": "Akash",
                    "lastName": "Ojha",
                    "createdOn": "2018-12-02T10:17:48.000Z",
                    "email": "akashojha15@gmail.com",
                    "mobileNumber": "7687886627",
                    "password": "$2b$10$bLYDCBEpUb1dcAEXlGYSR.SyPisf8Nq3Dnz65DrGw8Chks3mFXhF6"
                },
                {
                    "userId": "p3fDV7qKJj",
                    "firstName": "Jennifer",
                    "lastName": "Harvey",
                    "createdOn": "2018-12-04T11:45:30.000Z",
                    "email": "Chester1@yahoo.com",
                    "mobileNumber": "6984040419",
                    "password": "$2b$10$lg.yeBXCO7EhA4PN3FV2GOdZ.RSsBEYmDWyLWQMUniv76DZ9LnnIu"
                }
            ]
        }
    */

    app.get(
        `${baseUrl}/view/all`,
        auth.isAuthorized,
        userController.getAllUser
    );

    // params: authToken.

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/details api for get the user details of logged-in user.
     *
     * @apiParam {authToken} authToken authToken of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "User Details Found",
            "status": 200,
            "data": {
                "userId": "_3kGgiCCB",
                "firstName": "Akash",
                "lastName": "Ojha",
                "createdOn": "2018-12-02T10:17:48.000Z",
                "email": "akashojha15@gmail.com",
                "mobileNumber": "7687886627"
            }
        }
    */
    app.get(
        `${baseUrl}/details`,
        auth.isAuthorized,
        userController.getSingleUser
    );

    // params: firstName, lastName, email, mobileNumber, password.

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for user signup.
     *
     * @apiParam {email} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {firstName} firstName firstName of the user. (body params) (required)
     * @apiParam {lastName} lastName lastName of the user. (body params) (required)
     * @apiParam {mobileNumber} mobileNumber mobileNumber of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "User created",
            "status": 200,
            "data": {
                "userId": "TBOwVGeI2",
                "firstName": "Akash",
                "lastName": "Ojha",
                "createdOn": "2018-12-07T14:26:25.000Z",
                "_id": "5c0a8311131ed3009fdd2c9c",
                "email": "akashojha@gmail.com",
                "mobileNumber": "7687886625",
                "__v": 0
            }
        }
    */

    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    // params: email, password.
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InlFYzRrQW8zYyIsImlhdCI6MTU0NDE5MzM2OTg5NiwiZXhwIjoxNTQ0Mjc5NzY5LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6Il8za0dnaUNDQiIsImZpcnN0TmFtZSI6IkFrYXNoIiwibGFzdE5hbWUiOiJPamhhIiwiZW1haWwiOiJha2FzaG9qaGExNUBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOiI3Njg3ODg2NjI3In19.vpGfx2f_O2--wwy9Ala68tBbtNs5F0Aajc5Z4Ur_VtA",
                "userDetails": {
                    "userId": "_3kGgiCCB",
                    "firstName": "Akash",
                    "lastName": "Ojha",
                    "email": "akashojha15@gmail.com",
                    "mobileNumber": "7687886627"
                }
            }
    */

    app.post(`${baseUrl}/login`, userController.loginFunction);

    // params: authToken.

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout api for user logout.
     *
     * @apiParam {authToken} email email of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, data.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null
        }
    */

    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);

    //unused routes
    app.put(
        `${baseUrl}/:userId/edit`,
        auth.isAuthorized,
        userController.editUser
    );

    app.post(
        `${baseUrl}/:userId/delete`,
        auth.isAuthorized,
        userController.deleteUser
    );
};
