require('dotenv').config();
const db = require('../db');

module.exports.familiesPerformersUp = () => {
    return new Promise((resolve, reject) => {

        let createFamilies = `CREATE TABLE IF NOT EXISTS families_performers(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            family_id INT NOT NULL,
                            performer_id INT NOT NULL,
                            FOREIGN KEY(family_id) REFERENCES families(id) ON DELETE CASCADE,
                            FOREIGN KEY(performer_id) REFERENCES performers(id) ON DELETE CASCADE
                        )`;

        db.query(createFamilies, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Families performers table created');
        });
    });
    
}

module.exports.familiesPerformersDown = () => {
    return new Promise((resolve, reject) => {            
        const dropPerformers = "DROP TABLE IF EXISTS families_performers";
            
            db.query(dropPerformers, function (err, result) {
                if (err) return reject(err);
                return resolve("Families Performers pivot table deleted");
            });
    })
    
}