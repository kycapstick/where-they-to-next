const db = require('../scripts/db');

const Venue = (venue) => {
    this.name = venue.name;
    this.description = venue.description;
    this.address = venue.address;
    this.city = venue.city;
    this.province = venue.province;
    this.timezone = venue.timezone;
    this.accessibility_description = venue.accessibility_description;
    this.accent_color = venue.accent_color;
}

Venue.create = (newVenue, result) => {
    db.query("INSERT INTO venues set ?", newVenue, (err, res) => {
        if (err) {
            console.log(err);
            return result(err, null)
        }
        result(null, res.insertId);
    })
}

Venue.getVenue = (venue_id) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(`
                SELECT *
                FROM venues AS v
                WHERE v.id = ${venue_id}`, (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(JSON.parse(JSON.stringify(res)));
                }
            );

        } catch (err) {
            return reject(err);
        }
    });
}

Venue.getAllVenues = async() => {
    try {
        const result = await db.query("SELECT * FROM venues");
        return result;
    } catch (err) {
        return reject(err);
    }
    
}

module.exports = Venue;