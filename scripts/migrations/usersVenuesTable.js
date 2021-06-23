require('dotenv').config();
const db = require('../db');

module.exports.usersVenuesUp = () => {
    return new Promise((resolve, reject) => {

        let createUsersVenues = `CREATE TABLE IF NOT EXISTS users_venues(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            venue_id INT NOT NULL,
                            user_id INT NOT NULL,
                            FOREIGN KEY(venue_id) REFERENCES venues(id) ON DELETE CASCADE,
                            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
                        )`;

        db.query(createUsersVenues, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Users Venues table created');
        });
    });
    
}

module.exports.usersVenuesDown = () => {
    return new Promise((resolve, reject) => {            
        const dropUsersVenues = "DROP TABLE IF EXISTS users_venues";
            
            db.query(dropUsersVenues, function (err, result) {
                if (err) return reject(err);
                return resolve("Users Venues pivot table deleted");
            });
    })
    
}