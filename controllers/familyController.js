const db = require('../scripts/db');

const Family = (family) => {
    this.name = family.name;
    this.description = family.description;
    this.accent_color = family.accent_color;
}

Family.create = (newFamily, result) => {
    db.query("INSERT INTO families set ?", newFamily, (err, res) => {
        if (err) {
            console.log(err);
            return result(err, null)
        }
        console.log(res.insertId);
        result(null, res.insertId);
    })
}

Family.getFamily = (family_id) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(`
                SELECT *
                FROM families AS f
                WHERE f.id = ${family_id}`, (err, res) => {
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

Family.getAllFamilies = async (result) => {
    try {
        const result = await db.query("SELECT * FROM families")
        return result;
    } catch(e) {
        console.log(e);
    }
}

module.exports = Family;