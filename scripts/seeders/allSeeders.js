const db = require('../db');
const { seedArtists } = require('./artistsSeeds');
const { seedFamilies } = require('./familiesSeeds');
const { seedVenues } = require('./venuesSeeds');
const { seedEvents } = require('./eventSeeds');


const seedTables = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let status = await seedArtists();
            console.log(status);
            status = await seedFamilies();
            console.log(status);
            status = await seedVenues();
            console.log(status);
            status = await seedEvents();
            console.log(status);
            return resolve('All tables seeded.');
        } catch (err) {
            return reject(err);
        }
    })
    
}

const plantSeeds = async() => {
    try {
        await seedTables();
        db.end((err) => {
            if (err) {
                console.log(err);
            }
            console.log('All tables seeded successfully');
        })
    } catch (err) {
        console.log(err);
    }
}

plantSeeds().then(() => process.exit());
