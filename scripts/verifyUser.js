const db = require('./db');

module.exports.verifyUser = (id, user_id, table) => {
    return new Promise(async(resolve, reject) => {
        try {
            const userQuery = `SELECT user_id FROM ${table} 
            WHERE id = ${id}`;
            const results = await db.query(userQuery);
            if (results[0] && Number(results[0].user_id) === Number(user_id)) {
                return resolve(true);
            }
            return resolve(false);
        } catch(error) {
            console.log(error);
        }
    })

}