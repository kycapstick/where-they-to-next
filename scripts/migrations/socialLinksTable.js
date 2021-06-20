require('dotenv').config();
const db = require('../db');

module.exports.socialLinksUp = () => {
    return new Promise((resolve, reject) => {

        let createSocialLinks = `CREATE TABLE IF NOT EXISTS social_links(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            name TEXT NOT NULL,
                            facebook TEXT NULL,
                            instagram TEXT NULL,
                            tiktok TEXT NULL,
                            twitch TEXT NULL,
                            twitter TEXT NULL,
                            website TEXT NULL,
                            youtube TEXT NULL,
                            user_id INT NOT NULL,
                            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
                        )`;

        db.query(createSocialLinks, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('SocialLinks table created');
        });
    });
}

module.exports.socialLinksDown = () => {
    return new Promise((resolve, reject) => {            
        const dropSocialLinks = "DROP TABLE IF EXISTS socialLinks";
            
            db.query(dropSocialLinks, function (err, result) {
                if (err) return reject(err);
                return resolve("SocialLinks table deleted");
            });
    })
    
}