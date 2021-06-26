require('dotenv').config();
const db = require('../db');

module.exports.artistTypesUp = () => {
    return new Promise((resolve, reject) => {

        let createArtistTypes = `CREATE TABLE IF NOT EXISTS artist_types(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            name TEXT NOT NULL
                        )`;

        db.query(createArtistTypes, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Artist Types table created');
        });
    });
    
}

module.exports.artistTypesDown = () => {
    return new Promise((resolve, reject) => {            
        const dropArtistTypes = "DROP TABLE IF EXISTS artist_types";
            
            db.query(dropArtistTypes, function (err, result) {
                if (err) return reject(err);
                return resolve("Artist Types table deleted");
            });
    })
    
}