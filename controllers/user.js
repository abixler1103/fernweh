var db = require("../models");

module.exports = function (app) {

    app.get("/api/users", function (req, res) {
        db.Users.findAll({}).then(function (dbUsers) {
            var responseObject = {
                users: dbUsers
            }
            res.json(responseObject);
        })
    });

    app.get("/api/users/:id", function (req, res) {
       db.Users.findOne({
           where: {
               id: req.params.id
           }
       }).then(function(dbUsers) {
           res.json(dbUsers);
       })
    });

    app.put("/api/users/:id", function (req, res) {
        db.Users.update({
            
        },
    {
        where: {
            id: req.params.id
        }
    }).then(function(dbUsers) {
        res.json(dbUsers);
    })

    });

    // app.post("/api/users", function (req, res) {
    //     console.log(req.body);
    //     db.Users.create({
    //         dog_name: req.body.name,
    //         dog_photo: req.body.photo,
    //         dog_description: req.body.description,
    //         dog_location: req.body.location,
    //         dog_age: req.body.age,
    //         dog_breed: req.body.breed,
    //         dog_gender: req.body.gender,
    //         dog_available: true
    //     }).then(function (dbDogs) {
    //         res.location('/api/dogs/' + dbDogs.id);
    //         res.send(201);
    //     });

    // });
};
