require('dotenv').config();
const db = require('../db');

module.exports.eventsPerformersUp = () => {
    return new Promise((resolve, reject) => {

        let createEventsPerformers = `CREATE TABLE IF NOT EXISTS events_performers(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            performer_id INT NOT NULL,
                            event_id INT NOT NULL,
                            FOREIGN KEY(performer_id) REFERENCES performers(id) ON DELETE CASCADE,
                            FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE
                        )`;

        db.query(createEventsPerformers, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Events performers table created');
        });
    });
    
}

module.exports.eventsPerformersDown = () => {
    return new Promise((resolve, reject) => {            
        const dropEventsPerformers = "DROP TABLE IF EXISTS events_performers";
            
            db.query(dropEventsPerformers, function (err, result) {
                if (err) return reject(err);
                return resolve("Events Performers pivot table deleted");
            });
    })
    
}