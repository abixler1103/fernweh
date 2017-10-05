module.exports = function (sequelize, DataTypes) {
    var Survey = sequelize.define("Survey", {
        departure_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        question_one: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        question_two: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        question_three: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        question_four: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        question_five: {
            type: DataTypes.INTEGER,
            allownull: false,
            defaultValue: true
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allownull: false
        }
    });
    return Survey;
};