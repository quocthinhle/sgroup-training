/* eslint-disable linebreak-style */
require("dotenv").config();

module.exports = {
    development: {
        client: "postgres",
        connection: {
            connectionString: process.env.DB_CONNECT_URL,
            ssl: { rejectUnauthorized: false }
        },
        // connection: process.env.DB_CONNECT_URL,
        migrations: {
            directory: `${process.cwd()}/src/database/migrations`,
            tableName: "migrations",
        },
        seeds: {
            directory: `${process.cwd()}/src/database/seeds`,
            tableName: "seeds",
        },
    },
    production: {
        client: process.env.DATABASE_TYPE,
        connection: {
            connectionString: process.env.DB_CONNECT_URL,
            ssl: { rejectUnauthorized: false }
        },
        migrations: {
            directory: `${process.cwd()}/src/database/migrations`,
            tableName: "migrations",
        },
        seeds: {
            directory: `${process.cwd()}/src/database/seeds`,
            tableName: "seeds",
        },
        pool: {
            min: 2,
            max: 10,
        },
    }
}
