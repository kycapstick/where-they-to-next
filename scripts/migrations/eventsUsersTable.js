require('dotenv').config();
const db = require('../db');

module.exports.eventsUsersUp = () => {
    return new Promise((resolve, reject) => {

        let createEventsUsers = `CREATE TABLE IF NOT EXISTS events_users(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            event_id INT NOT NULL,
                            user_id INT NOT NULL,
                            FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE,
                            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
                        )`;

        db.query(createEventsUsers, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Events Users table created');
        });
    });
    
}

module.exports.eventsUsersDown = () => {
    return new Promise((resolve, reject) => {            
        const dropEventsUsers = "DROP TABLE IF EXISTS events_users";
            
            db.query(dropEventsUsers, function (err, result) {
                if (err) return reject(err);
                return resolve("Events Users pivot table deleted");
            });
    })
    
}