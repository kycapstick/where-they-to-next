const db = require('./db');
const { usersUp, usersDown } = require('./migrations/userTable');
const { performersUp, performersDown } = require('./migrations/performersTable');
const { familiesUp, familiesDown } = require('./migrations/familiesTable');
const { venuesUp, venuesDown } = require('./migrations/venuesTable');
const { eventsUp, eventsDown } = require('./migrations/eventsTable');

// Pivot Tables
const { eventsFamiliesUp, eventsFamiliesDown } = require('./migrations/eventsFamiliesTable');
const { eventsPerformersUp, eventsPerformersDown } = require('./migrations/eventsPerformersTable');
const { eventsUsersUp, eventsUsersDown } = require('./migrations/eventsUsersTable');
const { familiesPerformersUp, familiesPerformersDown } = require('./migrations/familiesPerformersTable');
const { familiesUsersUp, familiesUsersDown } = require('./migrations/familiesUsersTable');
const { performersUsersUp, performersUsersDown } = require('./migrations/performersUsersTable');
const { usersVenuesUp, usersVenuesDown } = require('./migrations/usersVenuesTable');


const up = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let status = await usersUp();
            console.log(status);
            status = await performersUp();
            console.log(status);
            status = await familiesUp();
            console.log(status);
            status = await venuesUp();
            console.log(status);
            status = await eventsUp();
            console.log(status);

            // Pivot Tables Up
            status = await familiesPerformersUp();
            console.log(status);
            status = await eventsFamiliesUp();
            console.log(status);
            status = await eventsPerformersUp();
            console.log(status);
            status = await eventsUsersUp();
            console.log(status);
            status = await familiesUsersUp();
            console.log(status);
            status = await performersUsersUp();
            console.log(status);
            status = await usersVenuesUp();
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
            // Pivot Tables Down
            let status = await familiesPerformersDown();
            console.log(status);
            status = await eventsFamiliesDown();
            console.log(status);
            status = await eventsPerformersDown();
            console.log(status);
            status = await eventsUsersDown();
            console.log(status);
            status = await familiesUsersDown();
            console.log(status);
            status = await performersUsersDown();
            console.log(status);
            status = await usersVenuesDown();
            console.log(status);

            // Main Tables Down
            status = await venuesDown();
            console.log(status);
            status = await performersDown();
            console.log(status);
            status = await familiesDown();
            console.log(status);
            status = await eventsDown();
            console.log(status);
            
            // Users Down
            status = await usersDown();
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