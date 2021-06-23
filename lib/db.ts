import mysql from 'serverless-mysql'
import { slugify } from '../scripts/utilities';

export const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        port: parseInt(process.env.MYSQL_PORT),
    },
})

export async function query(
    q: string,
    values: (string | number)[] | string | number = []
    ) {
    try {
        const results = await db.query(q, values)
        await db.end()
        return results
    } catch (e) {
        throw Error(e.message)
    }
}

export async function generateSlug( 
        name: string,
        route: string
    ) {
        return new Promise(async(resolve, reject) => {
            try {
                let slug = slugify(name);
                let unique = false;
                let results = [];
                let count = 1;
                let newSlug = slug;
                while (!unique) {
                    results = await db.query(`SELECT * FROM ${route} WHERE slug = ?`, newSlug);
                    if (!results.length) {
                        unique = true;
                    } else {
                        newSlug = `${slug}-${count}`;
                        count = count + 1;
                    }
                }
                return resolve(newSlug);
            } catch(err) {
                console.log(err);
                reject();
            }
        })
        
    }