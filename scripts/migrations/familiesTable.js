require('dotenv').config();
const db = require('../db');

module.exports.familiesUp = () => {
    return new Promise((resolve, reject) => {

        let createFamilies = `CREATE TABLE IF NOT EXISTS families(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            name TEXT NOT NULL,
                            description TEXT NOT NULL,
                            accent_color TEXT NULL
                        )`;

        db.query(createFamilies, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Families table created');
        });
    });
    
}

module.exports.familiesDown = () => {
    return new Promise((resolve, reject) => {            
        const dropPerformers = "DROP TABLE IF EXISTS families";
            
            db.query(dropPerformers, function (err, result) {
                if (err) return reject(err);
                return resolve("Families table deleted");
            });
    })
    
}