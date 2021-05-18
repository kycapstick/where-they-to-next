const db = require('../db');

module.exports.seedFamiliesPerformers = () => {
    return new Promise((resolve, reject) => {

        let seedFamiliesPerformers = `
                        INSERT INTO families_performers(family_id, performer_id)
                        VALUES
                        (1, 2),
                        (2, 2)
                        `;

        db.query(seedFamiliesPerformers, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Families Performers table seeded');
        });
    });
    
}