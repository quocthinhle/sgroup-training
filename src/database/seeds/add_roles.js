import { ROLES } from "../../common/enum/roles.enum"

exports.seed = async function(knex) {
  const roles = await knex.table('roles').select();
  const users = await knex.table('users').select().where("username", "<>", "quocthinhle2001@gmail.com").andWhere("id", ">=", "9");


  const usersRolesRecord = users.map(user => ({
    user_id: user.id,
    role_id: (roles.find(role => role.name === ROLES.VISITOR)).id,
  }));


  await knex.table('users_roles').insert(usersRolesRecord);
};
