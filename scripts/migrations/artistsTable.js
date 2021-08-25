require('dotenv').config();
const db = require('../db');

module.exports.artistsUp = () => {
    return new Promise((resolve, reject) => {

        let createArtists = `CREATE TABLE IF NOT EXISTS artists(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            slug VARCHAR(255) NOT NULL,
                            name TEXT NOT NULL,
                            bio TEXT NULL,
                            accent_color TEXT NULL,
                            tips TEXT NULL,
                            tips_link TEXT NULL,
                            user_id INT NOT NULL,
                            image_id INT NULL,
                            social_links_id INT NULL,
                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                            UNIQUE(slug)
                        )`;

        db.query(createArtists, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Artists table created');
        });
    });
    
}

module.exports.artistsDown = () => {
    return new Promise((resolve, reject) => {            
        const dropArtists = "DROP TABLE IF EXISTS artists";
            
            db.query(dropArtists, function (err, result) {
                if (err) return reject(err);
                return resolve("Table deleted");
            });
    })
    
}