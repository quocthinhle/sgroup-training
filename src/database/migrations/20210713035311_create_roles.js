/* eslint-disable linebreak-style */

/**
 * @param {import("knex")} knex
 */

export function up(knex) {
    return knex.schema.createTable("roles", (table) => {
        table.increments("id");
        table.string("name");
    });
}

export function down(knex) {
    return knex.schema.dropTableIfExists("roles");
}
