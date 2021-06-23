require('dotenv').config();
const db = require('../db');

module.exports.accessibilityUp = () => {
    return new Promise((resolve, reject) => {

        let createAccessibility = `CREATE TABLE IF NOT EXISTS accessibility(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            name TEXT NOT NULL,
                            user_id INT NOT NULL,
                            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
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