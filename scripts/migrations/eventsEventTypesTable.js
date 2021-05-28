require('dotenv').config();
const db = require('../db');

module.exports.eventsEventTypesUp = () => {
    return new Promise((resolve, reject) => {

        let createEventsEventTypes = `CREATE TABLE IF NOT EXISTS events_event_types(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            event_type_id INT NOT NULL,
                            event_id INT NOT NULL,
                            FOREIGN KEY(event_type_id) REFERENCES event_types(id) ON DELETE CASCADE,
                            FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE
                        )`;

        db.query(createEventsEventTypes, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Events Event Types table created');
        });
    });
    
}

module.exports.eventsEventTypesDown = () => {
    return new Promise((resolve, reject) => {            
        const dropEventsEventTypes = "DROP TABLE IF EXISTS events_event_types";
            
            db.query(dropEventsEventTypes, function (err, result) {
                if (err) return reject(err);
                return resolve("Events Event Types pivot table deleted");
            });
    })
    
}