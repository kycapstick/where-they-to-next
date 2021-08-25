require('dotenv').config();
const db = require('../db');

module.exports.artistsUsersUp = () => {
    return new Promise((resolve, reject) => {

        let createArtistsUsers = `CREATE TABLE IF NOT EXISTS artists_users(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            artist_id INT NOT NULL,
                            user_id INT NOT NULL,
                            FOREIGN KEY(artist_id) REFERENCES artists(id) ON DELETE CASCADE,
                            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
                        )`;

        db.query(createArtistsUsers, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Artists Users table created');
        });
    });
    
}

module.exports.artistsUsersDown = () => {
    return new Promise((resolve, reject) => {            
        const dropArtistsUsers = "DROP TABLE IF EXISTS artists_users";
            
            db.query(dropArtistsUsers, function (err, result) {
                if (err) return reject(err);
                return resolve("Artists Users pivot table deleted");
            });
    })
    
}