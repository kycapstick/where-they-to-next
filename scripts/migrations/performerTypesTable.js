require('dotenv').config();
const db = require('../db');

module.exports.performerTypesUp = () => {
    return new Promise((resolve, reject) => {

        let createPerformerTypes = `CREATE TABLE IF NOT EXISTS performer_types(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            name TEXT NOT NULL
                        )`;

        db.query(createPerformerTypes, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Performer Types table created');
        });
    });
    
}

module.exports.performerTypesDown = () => {
    return new Promise((resolve, reject) => {            
        const dropPerformerTypes = "DROP TABLE IF EXISTS performer_types";
            
            db.query(dropPerformerTypes, function (err, result) {
                if (err) return reject(err);
                return resolve("Performer Types table deleted");
            });
    })
    
}