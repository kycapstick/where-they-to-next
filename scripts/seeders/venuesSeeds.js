const db = require('../db');

module.exports.seedVenues = () => {
    return new Promise((resolve, reject) => {

        let seedVenues = `
            INSERT INTO venues(user_id, name, description, address, city, province, accessibility_description, accent_color, slug)
            VALUES
            ('1', 'The Beaver', 'Queer staple', '1192 Queen Street West', 'Toronto', 'ON', 'Small sets of stairs','#49A35D', 'the-beaver'),
            ('1', 'The Round', 'RIP', '152 Augusta Avenue', 'Toronto', 'ON', 'Second floor','#49A35D', 'the-round')
        `;

        db.query(seedVenues, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Venues table seeded');
        });
    });
    
}