const { DataTypes } = require('sequelize');
const db = require('../db');

const WorkoutLog = db.define('log', {
    descriptions: {
        type: DataTypes.STRING,
        allowNull: false
    },
    definitions: {
        type: DataTypes.STRING,
        allowNull: false
    },
    results: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER
    }
});

module.exports = WorkoutLog;