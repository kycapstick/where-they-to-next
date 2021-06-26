require('dotenv').config();
const db = require('../db');

module.exports.eventsArtistsUp = () => {
    return new Promise((resolve, reject) => {

        let createEventsArtists = `CREATE TABLE IF NOT EXISTS events_artists(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            artist_id INT NOT NULL,
                            event_id INT NOT NULL,
                            FOREIGN KEY(artist_id) REFERENCES artists(id) ON DELETE CASCADE,
                            FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE
                        )`;

        db.query(createEventsArtists, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Events artists table created');
        });
    });
    
}

module.exports.eventsArtistsDown = () => {
    return new Promise((resolve, reject) => {            
        const dropEventsArtists = "DROP TABLE IF EXISTS events_artists";
            
            db.query(dropEventsArtists, function (err, result) {
                if (err) return reject(err);
                return resolve("Events Artists pivot table deleted");
            });
    })
    
}