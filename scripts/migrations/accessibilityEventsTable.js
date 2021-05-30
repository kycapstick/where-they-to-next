require('dotenv').config();
const db = require('../db');

module.exports.accessibilityEventsUp = () => {
    return new Promise((resolve, reject) => {

        let createAccessibilityEvents = `CREATE TABLE IF NOT EXISTS accessibility_events(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            event_id INT NOT NULL,
                            accessibility_id INT NOT NULL,
                            FOREIGN KEY(accessibility_id) REFERENCES accessibility(id) ON DELETE CASCADE,
                            FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE
                        )`;

        db.query(createAccessibilityEvents, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Accessibility Events table created');
        });
    });
    
}

module.exports.accessibilityEventsDown = () => {
    return new Promise((resolve, reject) => {            
        const dropAccessibilityEvents = "DROP TABLE IF EXISTS accessibility_events";
            
            db.query(dropAccessibilityEvents, function (err, result) {
                if (err) return reject(err);
                return resolve("Accessibility Events pivot table deleted");
            });
    })
    
}