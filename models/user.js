module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1, 140] }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [1, 140] }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        questionOne: {
            type: DataTypes.STRING,
            allowNull: false
        },
        questionTwo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        questionThree: {
            type: DataTypes.STRING,
            allowNull: false
        },
        questionFour: {
            type: DataTypes.STRING,
            allowNull: false
        },
        questionFive: {
            type: DataTypes.BOOLEAN,
            allownull: false,
            defaultValue: true
        }
    });
    return Users;
};