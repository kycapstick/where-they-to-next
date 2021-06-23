require('dotenv').config();
const db = require('../db');

module.exports.eventTypesUp = () => {
    return new Promise((resolve, reject) => {

        let createEventTypes = `CREATE TABLE IF NOT EXISTS event_types(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            name TEXT NOT NULL
                        )`;

        db.query(createEventTypes, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Event Types table created');
        });
    });
    
}

module.exports.eventTypesDown = () => {
    return new Promise((resolve, reject) => {            
        const dropEventTypes = "DROP TABLE IF EXISTS event_types";
            
            db.query(dropEventTypes, function (err, result) {
                if (err) return reject(err);
                return resolve("Event Types table deleted");
            });
    })
    
}