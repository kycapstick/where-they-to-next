const db = require('../scripts/db');

const Family = require('./familyController');

const Performer = (performer) => {
    this.bio = performer.bio;
    this.accent_color = performer.accent_color;
    this.tips = performer.accent_color;
}

Performer.create = (newPerformer, result) => {
    db.query("INSERT INTO performers set ?", newPerformer, (err, res) => {
        if (err) {
            console.log(err);
            return result(err, null)
        }
        console.log(res.insertId);
        result(null, res.insertId);
    })
}

Performer.getFamilies = async (performer_id) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(`
                SELECT family_id
                FROM families_performers AS fp
                WHERE fp.performer_id = ${performer_id}`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(JSON.parse(JSON.stringify(res)));
            });
        } catch(err) {
            return reject(err);
        }
    })
}

Performer.populateFamilies = async (performers) => {
    return new Promise(async(resolve, reject) => {
        try {
            const populatedPerformers = await Promise.all(performers.map(async (result) => {
                result.families = [];
                const family_ids = await Performer.getFamilies(result.id);
                if (family_ids && family_ids.length) {
                    await Promise.all(family_ids.map(async (obj) => {
                        const { family_id } = obj;
                        const family = await Family.getFamily(family_id);
                        result.families.push(family[0]);
                    }));
                    return result;
                }
                return result;
            }));
            return resolve(populatedPerformers);
        } catch (err) {
            return reject(err);
        }

    })
    
}

Performer.getAllPerformers = async() => {
    try {
        let performers = await db.query(`
            SELECT *
            FROM performers
        `);
        if (performers.length) {
            performers = Performer.populateFamilies(performers);
        }
        return performers;
    } catch (err) {
        console.log(err);
    }
}

module.exports = Performer;