const db = require('../db');

module.exports.seedAccessibility = () => {
    return new Promise((resolve, reject) => {

        let seedAccessibility = `
            INSERT INTO accessibility(user_id, name)
            VALUES
            ('1', 'Accessible Parking'),
            ('1', 'Accessible Washroom'),
            ('1', 'Alternative Entrance'),
            ('1', 'ASL'),
            ('1', 'Automatic Door'),
            ('1', 'Braille'),
            ('1', 'Elevator'),
            ('1', 'Large Print'),
            ('1', 'Outdoor Access Only'),
            ('1', 'Ramp'),
            ('1', 'Service Animal Friendly'),
            ('1', 'Spacious'),
            ('1', 'StopGap Ramp')
        `;

        db.query(seedAccessibility, function(err, results, fields) {
            if (err) {
                return reject(err.message);
            }
            return resolve('Accessibility table seeded');
        });
    });
    
}