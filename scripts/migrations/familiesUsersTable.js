require('dotenv').config();
const db = require('../db');

module.exports.familiesUsersUp = () => {
    return new Promise((resolve, reject) => {

        let createFamiliesUsers = `CREATE TABLE IF NOT EXISTS families_users(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            family_id INT NOT NULL,
                            user_id INT NOT NULL,
                            FOREIGN KEY(family_id) REFERENCES families(id) ON DELETE CASCADE,
                            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
                        )`;

        db.query(createFamiliesUsers, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Families Users table created');
        });
    });
    
}

module.exports.familiesUsersDown = () => {
    return new Promise((resolve, reject) => {            
        const dropFamiliesUsers = "DROP TABLE IF EXISTS families_users";
            
            db.query(dropFamiliesUsers, function (err, result) {
                if (err) return reject(err);
                return resolve("Families Users pivot table deleted");
            });
    })
    
}