require('dotenv').config();
const db = require('../db');

module.exports.familiesUp = () => {
    return new Promise((resolve, reject) => {

        let createFamilies = `CREATE TABLE IF NOT EXISTS families(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            slug varchar(255) NOT NULL,
                            name TEXT NOT NULL,
                            description TEXT NULL,
                            tips TEXT NULL,
                            tips_link TEXT NULL,
                            accent_color TEXT NULL,
                            user_id INT NOT NULL,
                            image_id INT NULL,
                            social_links_id INT NULL,
                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                            UNIQUE(slug)
                        )`;

        db.query(createFamilies, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Families table created');
        });
    });
    
}

module.exports.familiesDown = () => {
    return new Promise((resolve, reject) => {            
        const dropArtists = "DROP TABLE IF EXISTS families";
            
            db.query(dropArtists, function (err, result) {
                if (err) return reject(err);
                return resolve("Families table deleted");
            });
    })
    
}