require('dotenv').config();
const db = require('../db');

module.exports.eventsFamiliesUp = () => {
    return new Promise((resolve, reject) => {

        let createEventsFamilies = `CREATE TABLE IF NOT EXISTS events_families(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            family_id INT NOT NULL,
                            event_id INT NOT NULL,
                            FOREIGN KEY(family_id) REFERENCES families(id) ON DELETE CASCADE,
                            FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE
                        )`;

        db.query(createEventsFamilies, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Events families table created');
        });
    });
    
}

module.exports.eventsFamiliesDown = () => {
    return new Promise((resolve, reject) => {            
        const dropEventsFamilies = "DROP TABLE IF EXISTS events_families";
            
            db.query(dropEventsFamilies, function (err, result) {
                if (err) return reject(err);
                return resolve("Events Families pivot table deleted");
            });
    })
    
}