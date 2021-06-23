require('dotenv').config();
const db = require('../db');

module.exports.accessibilityVenuesUp = () => {
    return new Promise((resolve, reject) => {

        let createAccessibilityVenues = `CREATE TABLE IF NOT EXISTS accessibility_venues(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            venue_id INT NOT NULL,
                            accessibility_id INT NOT NULL,
                            FOREIGN KEY(accessibility_id) REFERENCES accessibility(id) ON DELETE CASCADE,
                            FOREIGN KEY(venue_id) REFERENCES venues(id) ON DELETE CASCADE
                        )`;

        db.query(createAccessibilityVenues, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Accessibility Venues table created');
        });
    });
    
}

module.exports.accessibilityVenuesDown = () => {
    return new Promise((resolve, reject) => {            
        const dropAccessibilityVenues = "DROP TABLE IF EXISTS accessibility_venues";
            
            db.query(dropAccessibilityVenues, function (err, result) {
                if (err) return reject(err);
                return resolve("Accessibility Venues pivot table deleted");
            });
    })
    
}