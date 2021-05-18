require('dotenv').config();
const db = require('../db');

module.exports.venuesUp = () => {
    return new Promise((resolve, reject) => {

        let createVenues = `CREATE TABLE IF NOT EXISTS venues(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            name TEXT NOT NULL,
                            address TEXT NOT NULL,
                            city TEXT NOT NULL,
                            province TEXT NOT NULL,
                            timezone TEXT NOT NULL,
                            description TEXT NOT NULL,
                            accent_color TEXT NULL,
                            accessibility_description TEXT NULL
                        )`;

        db.query(createVenues, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Venues table created');
        });
    });
    
}

module.exports.venuesDown = () => {
    return new Promise((resolve, reject) => {            
        const dropVenues = "DROP TABLE IF EXISTS venues";
            
            db.query(dropVenues, function (err, result) {
                if (err) return reject(err);
                return resolve("Venues table deleted");
            });
    })
    
}