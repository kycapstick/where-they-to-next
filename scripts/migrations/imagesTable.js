require('dotenv').config();
const db = require('../db');

module.exports.imagesUp = () => {
    return new Promise((resolve, reject) => {

        let createImages = `CREATE TABLE IF NOT EXISTS images(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            name TEXT NOT NULL,
                            alt TEXT NULL,
                            url TEXT NOT NULL,
                            user_id INT NOT NULL,
                            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
                        )`;

        db.query(createImages, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Images table created');
        });
    });
}

module.exports.imagesDown = () => {
    return new Promise((resolve, reject) => {            
        const dropImages = "DROP TABLE IF EXISTS images";
            
            db.query(dropImages, function (err, result) {
                if (err) return reject(err);
                return resolve("Images table deleted");
            });
    })
    
}