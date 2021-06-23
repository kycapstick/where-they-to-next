require('dotenv').config();
const db = require('../db');

module.exports.performersPerformerTypesUp = () => {
    return new Promise((resolve, reject) => {

        let createPerformersPerformerTypes = `CREATE TABLE IF NOT EXISTS performers_performer_types(
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            performer_type_id INT NOT NULL,
                            performer_id INT NOT NULL,
                            FOREIGN KEY(performer_type_id) REFERENCES performer_types(id) ON DELETE CASCADE,
                            FOREIGN KEY(performer_id) REFERENCES performers(id) ON DELETE CASCADE
                        )`;

        db.query(createPerformersPerformerTypes, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Performers Performer Types table created');
        });
    });
    
}

module.exports.performersPerformerTypesDown = () => {
    return new Promise((resolve, reject) => {            
        const dropPerformersPerformerTypes = "DROP TABLE IF EXISTS performers_performer_types";
            
            db.query(dropPerformersPerformerTypes, function (err, result) {
                if (err) return reject(err);
                return resolve("Performers Performer Types pivot table deleted");
            });
    })
    
}