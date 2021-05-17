const db = require('../scripts/db');

const Event = (event) => {
    this.name = event.name;
    this.description = event.description;
    this.date = event.date;
    this.show_time = event.show_time;
    this.doors = event.doors;
    this.tickets = event.tickets;
    this.tickets_url = event.tickets_url;
    this.accessibility_description = event.accessibility_description;
    this.accent_color = event.accent_color;
}

Event.create = (newEvent, result) => {
    return new Promise((resolve, reject) => {
        try {
            db.query("INSERT INTO events set ?", newEvent, (err, res) => {
                if (err) {
                    result(err, null);
                    return reject('Something went wrong');
                }
                result(null, res.insertId);
                return resolve();
            })
        } catch (err) {
            return reject(err);
        }
    })
}

Event.getEvent = (event_id) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(`
                SELECT *
                FROM events AS e
                WHERE e.id = ${event_id}`, (err, res) => {
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

Event.getAllEvents = async(result) => {
    try {
        const result = await db.query("SELECT * FROM events");
        return result;
    } catch (err) {
        return new Error(err);   
    }
}

module.exports = Event;