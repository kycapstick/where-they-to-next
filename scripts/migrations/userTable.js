require('dotenv').config();
const db = require('../db');

module.exports.usersUp = () => {
    return new Promise(async(resolve, reject) => {
        
        const createAccounts = `CREATE TABLE IF NOT EXISTS accounts(
            id INT NOT NULL AUTO_INCREMENT,
            compound_id VARCHAR(255) NOT NULL,
            user_id INTEGER NOT NULL,
            provider_type VARCHAR(255) NOT NULL,
            provider_id VARCHAR(255) NOT NULL,
            provider_account_id VARCHAR(255) NOT NULL,
            refresh_token TEXT,
            access_token TEXT,
            access_token_expires TIMESTAMP(6),
            created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            PRIMARY KEY (id)
        )`;


        const createSessions = `CREATE TABLE IF NOT EXISTS sessions(
            id INT NOT NULL AUTO_INCREMENT,
            user_id INTEGER NOT NULL,
            expires TIMESTAMP(6) NOT NULL,
            session_token VARCHAR(255) NOT NULL,
            access_token VARCHAR(255) NOT NULL,
            created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            PRIMARY KEY (id)
        )`;

        const createUsers = `
            CREATE TABLE users (
                id             INT NOT NULL AUTO_INCREMENT,
                name           VARCHAR(255),
                email          VARCHAR(255),
                email_verified TIMESTAMP(6),
                image          VARCHAR(255),
                created_at     TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updated_at     TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                PRIMARY KEY (id)
            )
        `;

        const createVerificationRequests = `
            CREATE TABLE verification_requests (
                id         INT NOT NULL AUTO_INCREMENT,
                identifier VARCHAR(255) NOT NULL,
                token      VARCHAR(255) NOT NULL,
                expires    TIMESTAMP(6) NOT NULL,
                created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                PRIMARY KEY (id)
            )
        `;

        const createCompoundId = `
            CREATE UNIQUE INDEX compound_id
            ON accounts(compound_id)
        `

        const createProviderAccountId = `
            CREATE INDEX provider_account_id
            ON accounts(provider_account_id)
        `
        
        const createProviderId = `
            CREATE INDEX provider_id
            ON accounts(provider_id)
        `

        const createUserId = `
            CREATE INDEX user_id
            ON accounts(user_id)
        `
                
        const createSessionTokens = `
            CREATE UNIQUE INDEX session_token
            ON sessions(session_token)
        `;

        const createAccessToken = `
            CREATE UNIQUE INDEX access_token
            ON sessions(access_token)
        `; 
        
        const createEmail = `
            CREATE UNIQUE INDEX email
            ON users(email)
        `
        
        const createToken = `
            CREATE UNIQUE INDEX token
            ON verification_requests(token)
        `    

        await db.query(createAccounts);
        console.log('Accounts table created')
        
        await db.query(createSessions);
        console.log('Sesssions table created');
        
        await db.query(createUsers);
        console.log('Users table created');
        
        await db.query(createVerificationRequests);
        console.log('Verification requests table created');
        
        await db.query(createCompoundId);
        console.log('Compound ID created');
        
        await db.query(createProviderAccountId);
        console.log('Provider Account ID created');

        await db.query(createProviderId);
        console.log('Provider ID created');

        await db.query(createUserId);
        console.log('User ID created');

        await db.query(createSessionTokens);
        console.log('Sessions token created');

        await db.query(createAccessToken);
        console.log('Access token created');

        await db.query(createEmail);
        console.log('Email created');

        await db.query(createToken);
        console.log('Token created');

        console.log('All user tables have been populated.')
        return resolve();
    });
}

module.exports.usersDown = () => {
return new Promise((resolve, reject) => {            
    const dropUsers = `
        DROP TABLE IF EXISTS accounts, sessions, users, verification_requests;
    `;
        
    db.query(dropUsers, function (err, result) {
        if (err) return reject(err);
        return resolve("All users tables deleted");
    });
})

}



