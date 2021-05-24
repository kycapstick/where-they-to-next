require('dotenv').config();
const db = require('../db');

module.exports.performersUsersUp = () => {
    return new Promise((resolve, reject) => {

        let createPerformersUsers = `CREATE TABLE IF NOT EXISTS performers_users(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            performer_id INT NOT NULL,
                            user_id INT NOT NULL,
                            FOREIGN KEY(performer_id) REFERENCES performers(id) ON DELETE CASCADE,
                            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
                        )`;

        db.query(createPerformersUsers, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Performers Users table created');
        });
    });
    
}

module.exports.performersUsersDown = () => {
    return new Promise((resolve, reject) => {            
        const dropPerformersUsers = "DROP TABLE IF EXISTS performers_users";
            
            db.query(dropPerformersUsers, function (err, result) {
                if (err) return reject(err);
                return resolve("Performers Users pivot table deleted");
            });
    })
    
}