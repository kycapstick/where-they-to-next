const db = require('../db');

module.exports.seedEvents = () => {
    return new Promise((resolve, reject) => {

        let seedEvents = `
            INSERT INTO events(user_id, name, description, accent_color, date, doors, show_time, tickets, tickets_url, slug)
            VALUES
            ('1', 'Gaybourhood Watch', 'Viewing party', '#49A35D', '2021-10-21', '8pm', '10pm', 'Something about tickets', 'https://www.google.com', 'gaybourhood-watch'),
            ('1', 'Gaybourhood Watch', 'Viewing party', '#49A35D', '2021-10-21', '8pm', '10pm', 'Something about tickets', 'https://www.google.com', 'gaybourhood-watch-1')
        `;

        db.query(seedEvents, function (err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Events table seeded');
        });
    });
    
}