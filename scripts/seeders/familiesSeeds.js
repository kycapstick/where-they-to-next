const db = require('../db');

module.exports.seedFamilies = () => {
    return new Promise((resolve, reject) => {

        let seedFamilies = `
            INSERT INTO families(user_id, name, description, accent_color, slug)
            VALUES
            ('1', 'The Diet Ghosts', 'Family of miscreants haunting Toronto nightlife', '#49A35D', 'the-diet-ghosts'),
            ('1', 'Boylesque TO', 'Canadas premiere boylesque  troupe', '#1939D0', 'boylesque-to')
        `;

        db.query(seedFamilies, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Families table seeded');
        });
    });
    
}