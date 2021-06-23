const db = require('./db');
// Users
const { usersUp, usersDown } = require('./migrations/userTable');

// Primary Tables
const { eventsUp, eventsDown } = require('./migrations/eventsTable');
const { familiesUp, familiesDown } = require('./migrations/familiesTable');
const { performersUp, performersDown } = require('./migrations/performersTable');
const { venuesUp, venuesDown } = require('./migrations/venuesTable');

// Shared Tables
const { accessibilityUp, accessibilityDown } = require("./migrations/accessibilityTable");
const { eventTypesUp, eventTypesDown } = require("./migrations/eventTypesTable");
const { imagesUp, imagesDown } = require('./migrations/imagesTable');
const { performerTypesUp, performerTypesDown } = require('./migrations/performerTypesTable');
const { socialLinksUp, socialLinksDown } = require("./migrations/socialLinksTable");


// Accessibility Pivot Tables
const { accessibilityEventsUp, accessibilityEventsDown } = require('./migrations/accessibilityEventsTable');
const { accessibilityVenuesUp, accessibilityVenuesDown } = require('./migrations/accessibilityVenuesTable');

// Events Pivot Tables
const { eventsFamiliesUp, eventsFamiliesDown } = require('./migrations/eventsFamiliesTable');
const { eventsPerformersUp, eventsPerformersDown } = require('./migrations/eventsPerformersTable');
const { eventsEventTypesUp, eventsEventTypesDown } = require('./migrations/eventsEventTypesTable');

// Following Pivot Tables
const { eventsUsersUp, eventsUsersDown } = require('./migrations/eventsUsersTable');
const { familiesUsersUp, familiesUsersDown } = require('./migrations/familiesUsersTable');
const { performersUsersUp, performersUsersDown } = require('./migrations/performersUsersTable');
const { usersVenuesUp, usersVenuesDown } = require('./migrations/usersVenuesTable');

// Performers Pivot Tables
const { familiesPerformersUp, familiesPerformersDown } = require('./migrations/familiesPerformersTable');
const { performersPerformerTypesUp, performersPerformerTypesDown } = require('./migrations/performersPerformerTypesTable');


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

            // Shared Tables
            status = await accessibilityUp();
            console.log(status);
            status = await eventTypesUp();
            console.log(status);
            status = await imagesUp();
            console.log(status);
            status = await performerTypesUp();
            console.log(status);
            status = await socialLinksUp();
            console.log(status);

            // Accessibility Pivot Tables Up
            status = await accessibilityEventsUp();
            console.log(status);
            status = await accessibilityVenuesUp();
            console.log(status);

            // Events Pivot Tables up
            status = await eventsEventTypesUp();
            console.log(status);
            status = await eventsFamiliesUp();
            console.log(status);
            status = await eventsPerformersUp();
            console.log(status);

            // Following Pivot Tables Up
            status = await eventsUsersUp();
            console.log(status);
            status = await familiesUsersUp();
            console.log(status);
            status = await performersUsersUp();
            console.log(status);
            status = await usersVenuesUp();
            console.log(status);

            // Performers Pivot Tables up 
            status = await familiesPerformersUp();
            console.log(status);
            status = await performersPerformerTypesUp();
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
            // Performer Pivot Tables down
            let status = await familiesPerformersDown();
            console.log(status);
            status = await performersPerformerTypesDown();
            console.log(status);
            
            // Following Pivot Tables down
            status = await eventsUsersDown();
            console.log(status);
            status = await familiesUsersDown();
            console.log(status);
            status = await performersUsersDown();
            console.log(status);
            status = await usersVenuesDown();
            console.log(status);

            // Events Pivot Tables down
            status = await eventsEventTypesDown();
            console.log(status);
            status = await eventsFamiliesDown();
            console.log(status);
            status = await eventsPerformersDown();
            console.log(status);

            // Accessibility Tables down
            status = await accessibilityEventsDown();
            console.log(status);
            status = await accessibilityVenuesDown();
            console.log(status);

            // Shared tables down
            status = await accessibilityDown();
            console.log(status);
            status = await eventTypesDown();
            console.log(status);
            status = await imagesDown();
            console.log(status);
            status = await performerTypesDown();
            console.log(status);
            status = await socialLinksDown();
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