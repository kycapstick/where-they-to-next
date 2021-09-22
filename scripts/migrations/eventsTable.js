require('dotenv').config();
const db = require('../db');

module.exports.eventsUp = () => {
    return new Promise((resolve, reject) => {

        let createEvents = `CREATE TABLE IF NOT EXISTS events(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            slug varchar(255) NOT NULL,
                            created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            name TEXT NOT NULL,
                            date DATE NOT NULL,
                            doors TEXT NULL,
                            description TEXT NULL,
                            digital BOOLEAN,
                            show_time TEXT NULL,
                            tickets TEXT NULL,
                            tickets_url TEXT NULL,
                            accent_color TEXT NULL,
                            accessibility_description TEXT NULL,
                            user_id INT NOT NULL,
                            image_id INT NULL,
                            venue_id INT NULL,
                            venue_name TEXT NULL,
                            address TEXT NULL,
                            city TEXT NULL,
                            province TEXT NULL,
                            social_links_id INT NULL,
                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                            UNIQUE(slug)
                        )`;

        db.query(createEvents, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Events table created');
        });
    });
    
}

module.exports.eventsDown = () => {
    return new Promise((resolve, reject) => {            
        const dropEvents = "DROP TABLE IF EXISTS events";
            
            db.query(dropEvents, function (err, result) {
                if (err) return reject(err);
                return resolve("Events table deleted");
            });
    })
    
}