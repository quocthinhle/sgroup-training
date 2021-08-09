import { USER_STATUS } from "../../common/enum/user-status.enum";

/**
 * 
 * @param {*} knex 
 */
export function up(knex) {
	return knex.schema.alterTable("users", (table) => {
		table.string("city");
		table.string("avatar");
		table.integer("age");
		table.enum("status", Object.values(USER_STATUS)).defaultTo(USER_STATUS.AVAILABLE);
	})
}

/**
 * @param {import("knex")} knex
 */
 export function down(knex) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('city');
        table.dropColumn('avatar');
        table.dropColumn('age');
        table.dropColumn('status');
    });
}