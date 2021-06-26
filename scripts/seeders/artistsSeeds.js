const db = require('../db');

module.exports.seedArtists = () => {
    return new Promise((resolve, reject) => {

        let seedArtists = `
                        INSERT INTO artists(user_id, name, bio, accent_color, tips, slug)
                        VALUES
                        ('1', 'Lady Kunterpunt', 'Clown', '#49A35D', 'paypal', 'lady-kunterpunt'),
                        ('1', 'Kuya Atay', 'Burlesque', '#1939D0', 'paypal', 'kuya-atay')
                        `;

        db.query(seedArtists, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Artists table seeded');
        });
    });
    
}