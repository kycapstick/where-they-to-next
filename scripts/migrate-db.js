const db = require('./db');
// Users
const { usersUp, usersDown } = require('./migrations/userTable');

// Primary Tables
const { eventsUp, eventsDown } = require('./migrations/eventsTable');
const { familiesUp, familiesDown } = require('./migrations/familiesTable');
const { artistsUp, artistsDown } = require('./migrations/artistsTable');
const { venuesUp, venuesDown } = require('./migrations/venuesTable');

// Shared Tables
const { accessibilityUp, accessibilityDown } = require("./migrations/accessibilityTable");
const { eventTypesUp, eventTypesDown } = require("./migrations/eventTypesTable");
const { imagesUp, imagesDown } = require('./migrations/imagesTable');
const { artistTypesUp, artistTypesDown } = require('./migrations/artistTypesTable');
const { socialLinksUp, socialLinksDown } = require("./migrations/socialLinksTable");


// Accessibility Pivot Tables
const { accessibilityEventsUp, accessibilityEventsDown } = require('./migrations/accessibilityEventsTable');
const { accessibilityVenuesUp, accessibilityVenuesDown } = require('./migrations/accessibilityVenuesTable');

// Events Pivot Tables
const { eventsFamiliesUp, eventsFamiliesDown } = require('./migrations/eventsFamiliesTable');
const { eventsArtistsUp, eventsArtistsDown } = require('./migrations/eventsArtistsTable');
const { eventsEventTypesUp, eventsEventTypesDown } = require('./migrations/eventsEventTypesTable');

// Following Pivot Tables
const { eventsUsersUp, eventsUsersDown } = require('./migrations/eventsUsersTable');
const { familiesUsersUp, familiesUsersDown } = require('./migrations/familiesUsersTable');
const { artistsUsersUp, artistsUsersDown } = require('./migrations/artistsUsersTable');
const { usersVenuesUp, usersVenuesDown } = require('./migrations/usersVenuesTable');

// Artists Pivot Tables
const { familiesArtistsUp, familiesArtistsDown } = require('./migrations/familiesArtistsTable');
const { artistsArtistTypesUp, artistsArtistTypesDown } = require('./migrations/artistsArtistTypesTable');


const up = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let status = await usersUp();
            console.log(status);
            status = await artistsUp();
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
            status = await artistTypesUp();
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
            status = await eventsArtistsUp();
            console.log(status);

            // Following Pivot Tables Up
            status = await eventsUsersUp();
            console.log(status);
            status = await familiesUsersUp();
            console.log(status);
            status = await artistsUsersUp();
            console.log(status);
            status = await usersVenuesUp();
            console.log(status);

            // Artists Pivot Tables up 
            status = await familiesArtistsUp();
            console.log(status);
            status = await artistsArtistTypesUp();
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
            // Artist Pivot Tables down
            let status = await familiesArtistsDown();
            console.log(status);
            status = await artistsArtistTypesDown();
            console.log(status);
            
            // Following Pivot Tables down
            status = await eventsUsersDown();
            console.log(status);
            status = await familiesUsersDown();
            console.log(status);
            status = await artistsUsersDown();
            console.log(status);
            status = await usersVenuesDown();
            console.log(status);

            // Events Pivot Tables down
            status = await eventsEventTypesDown();
            console.log(status);
            status = await eventsFamiliesDown();
            console.log(status);
            status = await eventsArtistsDown();
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
            status = await artistTypesDown();
            console.log(status);
            status = await socialLinksDown();
            console.log(status);

            // Main Tables Down
            status = await venuesDown();
            console.log(status);
            status = await artistsDown();
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