var db = require('../models');
var Users = db.Users;
var Survey = db.Survey;
var path = require('path');
var Cookies = require("cookies");
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var CLIENT_ID = "1035648329780-d8khj8u006n1ghd724opv2suarb6bbrk.apps.googleusercontent.com";
var client = new auth.OAuth2(CLIENT_ID, '', '');

module.exports = function (app) {

    function authenticate (token, successCallback, failureCallback) {
        client.verifyIdToken(
            token,
            CLIENT_ID,
            function(e, login) {
              if (login != null) {
                var payload = login.getPayload();
                var userid = payload['sub'];
                successCallback(userid);
              } else {
                  failureCallback();
              }
            });
    }

    app.get("/api/surveys", function (req, res) {
        var token = new Cookies(req, res).get("access_token");
        authenticate(token, function (userid) {
            db.Users.findOne({
                where: {
                    client_id: userid
                }
            }).then(function(dbUser) {
                db.Survey.findAll({
                    where: {
                        user_id: dbUser.id
                    }
                }).then(function (dbSurveys) {
                    var responseObject = {
                        survey: dbSurveys
                    }
                    res.json(responseObject);
                })
            })
        },
        function() {
            res.sendStatus(401);
        });

        
    });

    app.get("/api/surveys/:id", function (req, res) {
        var token = new Cookies(req, res).get("access_token");
        authenticate(token, function (userid) {
            db.Users.findOne({
                where: {
                    client_id: userid
                }
            }).then(function(dbUser) {
                db.Survey.findOne({
                    where: {
                        user_id: dbUser.id,
                        id: req.params.id
                    }
                }).then(function (dbSurvey) {
                    res.json(dbSurvey);
                })
            })
        },
        function() {
            res.sendStatus(401);
        });
    
    });

    app.post("/api/surveys", function (req, res) {
        console.log(req.body);
        var token = new Cookies(req, res).get("access_token");
        authenticate(token, function (userid) {
            db.Users.findOne({
                where: {
                    client_id: userid
                }
            }).then(function(dbUser) {
                console.log(req.body);
                db.Survey.create({
                    user_id: dbUser.id,
                    departure_date: req.body.departure_date,
                    question_one: req.body.question_one,
                    question_two: req.body.question_three,
                    question_three: req.body.question_three,
                    question_four: req.body.question_four,
                    question_five: req.body.question_five
                }).then(function (dbSurvey) {
                    res.location('/api/surveys/' + dbSurvey.id);
                    res.send(201);
                })
            })
        },
        function() {
            res.sendStatus(401);
        });
       
    });

    app.delete("/api/surveys/:id", function (req, res) {
        var token = new Cookies(req, res).get("access_token");
        authenticate(token, function (userid) {
            db.Users.findOne({
                where: {
                    client_id: userid
                }
            }).then(function(dbUser) {
                db.Survey.destroy({
                    where: {
                        user_id: dbUser.id,
                        id: req.params.id
                    }
                }).then(function (dbSurvey) {
                    res.sendStatus(200);
                })
            })
        },
        function() {
            res.sendStatus(401);
        });
        
    });

    app.post('/authenticate', function (req, res) {
        console.log(req.body.token);
        var token = req.body.token;
        authenticate(token, function(userid) {
            //see if exists in database, if not create user
            db.Users.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                client_id: userid
            }).then(function(dbUser) {
                new Cookies(req, res).set("access_token", token);
                res.sendStatus(200);
            });
        }, 
        function() {
           res.sendStatus(401);
        }
    );
   
    });

};
