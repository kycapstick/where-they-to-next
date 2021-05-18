const db = require('../db');

module.exports.seedPerformers = () => {
    return new Promise((resolve, reject) => {

        let seedPerformers = `
                        INSERT INTO performers(name, bio, accent_color, tips)
                        VALUES
                        ('Lady Kunterpunt', 'Clown', '49A35D', 'paypal'),
                        ('Kuya Atay', 'Burlesque', '1939D0', 'paypal')
                        `;

        db.query(seedPerformers, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Performers table seeded');
        });
    });
    
}