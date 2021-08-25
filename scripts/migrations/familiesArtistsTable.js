require('dotenv').config();
const db = require('../db');

module.exports.familiesArtistsUp = () => {
    return new Promise((resolve, reject) => {

        let createFamilies = `CREATE TABLE IF NOT EXISTS families_artists(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            family_id INT NOT NULL,
                            artist_id INT NOT NULL,
                            FOREIGN KEY(family_id) REFERENCES families(id) ON DELETE CASCADE,
                            FOREIGN KEY(artist_id) REFERENCES artists(id) ON DELETE CASCADE
                        )`;

        db.query(createFamilies, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Families artists table created');
        });
    });
    
}

module.exports.familiesArtistsDown = () => {
    return new Promise((resolve, reject) => {            
        const dropArtists = "DROP TABLE IF EXISTS families_artists";
            
            db.query(dropArtists, function (err, result) {
                if (err) return reject(err);
                return resolve("Families Artists pivot table deleted");
            });
    })
    
}