const db = require('../db');

module.exports.seedPerformers = () => {
    return new Promise((resolve, reject) => {

        let seedPerformers = `
                        INSERT INTO performers(user_id, name, bio, accent_color, tips)
                        VALUES
                        ('1', 'Lady Kunterpunt', 'Clown', '49A35D', 'paypal'),
                        ('1', 'Kuya Atay', 'Burlesque', '1939D0', 'paypal')
                        `;

        db.query(seedPerformers, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Performers table seeded');
        });
    });
    
}