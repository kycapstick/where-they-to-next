require('dotenv').config();
const db = require('../db');

module.exports.accessibilityUp = () => {
    return new Promise((resolve, reject) => {

        let createAccessibility = `CREATE TABLE IF NOT EXISTS accessibility(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            name TEXT NOT NULL,
                            FOREIGN KEY(family_id) REFERENCES families(id) ON DELETE CASCADE,
                            FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE
                        )`;

        db.query(createAccessibility, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Accessibility table created');
        });
    });
}

module.exports.accessibilityDown = () => {
    return new Promise((resolve, reject) => {            
        const dropAccessibility = "DROP TABLE IF EXISTS accessibility";
            
            db.query(dropAccessibility, function (err, result) {
                if (err) return reject(err);
                return resolve("Accessibility table deleted");
            });
    })
    
}