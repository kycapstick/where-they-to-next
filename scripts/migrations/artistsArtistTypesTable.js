require('dotenv').config();
const db = require('../db');

module.exports.artistsArtistTypesUp = () => {
    return new Promise((resolve, reject) => {

        let createArtistsArtistTypes = `CREATE TABLE IF NOT EXISTS artists_artist_types(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            artist_type_id INT NOT NULL,
                            artist_id INT NOT NULL,
                            FOREIGN KEY(artist_type_id) REFERENCES artist_types(id) ON DELETE CASCADE,
                            FOREIGN KEY(artist_id) REFERENCES artists(id) ON DELETE CASCADE
                        )`;

        db.query(createArtistsArtistTypes, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Artists Artist Types table created');
        });
    });
    
}

module.exports.artistsArtistTypesDown = () => {
    return new Promise((resolve, reject) => {            
        const dropArtistsArtistTypes = "DROP TABLE IF EXISTS artists_artist_types";
            
            db.query(dropArtistsArtistTypes, function (err, result) {
                if (err) return reject(err);
                return resolve("Artists Artist Types pivot table deleted");
            });
    })
    
}