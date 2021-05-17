const db = require('./db');
const { performersUp, performersDown } = require('./migrations/performersTable');
const { familiesUp, familiesDown } = require('./migrations/familiesTable');
const { familiesPerformersUp, familiesPerformersDown } = require('./migrations/familiesPerformersTable');
const { venuesUp, venuesDown } = require('./migrations/venuesTable');
const { eventsUp, eventsDown } = require('./migrations/eventsTable');

const up = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let status = await performersUp();
            console.log(status);
            status = await familiesUp();
            console.log(status);
            status = await familiesPerformersUp();
            console.log(status);
            status = await venuesUp();
            console.log(status);
            status = await eventsUp();
            console.log(status);
            return resolve('All tables created.');
        } catch (err) {
            return reject(err);
        }
    })
    
}

const down = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let status = await familiesPerformersDown();
            console.log(status);
            status = await venuesDown();
            console.log(status);
            status = await performersDown();
            console.log(status);
            status = await familiesDown();
            console.log(status);
            status = await eventsDown();
            console.log(status);
            return resolve('All tables dropped.')
        } catch (err) {
            return reject(err);
        }
    })
}

const migrations = async () => {
    try {
        await down();
        await up();
        await db.end((err) => {
            if (err) {
                console.log(err);
            }
            console.log('All Migrations run successfully');
        })
    } catch (err) {
        console.log(err);
    }
}

migrations().then(() => process.exit());