import { ROLES } from "../../common/enum/roles.enum"

export function up(knex) {
  const roles = Object.values(ROLES).map(name => ({name}));
  console.log(roles);
  return knex.table("roles").insert(roles);
};

export function down(knex) { return knex.table('roles').delete(); }