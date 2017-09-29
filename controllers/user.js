var db = require('../models');
var Users = db.Users;
var Survey = db.Survey;
var path = require('path');

module.exports = function (app) {

    app.get("/api/surveys", function (req, res) {
        db.Survey.findAll({}).then(function (dbSurveys) {
            var responseObject = {
                survey: dbSurveys
            }
            res.json(responseObject);
        })
    });

    app.get("/api/surveys/:id", function (req, res) {
       db.Survey.findOne({
           where: {
               id: req.params.id
           }
       }).then(function(dbSurvey) {
           res.json(dbSurvey);
       })
    });

    app.post("/api/surveys", function(req, res) {
        console.log(req.body);
        db.Survey.create({
            departure_date: req.body.departure_date,
            question_one: req.body.question_one,
            question_two: req.body.question_three,
            question_three: req.body.question_three,
            question_four: req.body.question_four,
            question_five: req.body.question_five
        }).then(function(dbSurvey) {
            res.location('/api/survey/' + dbSurvey.id);
            res.send(201);
        })
    });

    app.delete("/api/surveys", function(req, res) {
        db.Survey.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbSurvey) {
            res.json(dbSurvey)
        })
    });

};
