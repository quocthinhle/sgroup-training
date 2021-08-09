// @ts-check

import { BcryptService } from '../../api-rest/auth/services/bcrypt.service';
import { ROLES } from '../../common/enum/roles.enum';
import { ConfigService } from '../../libs/config/config.service';

let PATH_LOOKUP = `${process.cwd()}/.env`;

ConfigService.config({
    cache: false,
    pathLookup: PATH_LOOKUP
});

PATH_LOOKUP = null;

/**
 * @param {import("knex")} knex
 */
export async function up(knex) {
    // @ts-ignore
    const roles = await knex.table('roles').select();
    // @ts-ignore
    const [id] = await knex.table('users').returning('id').insert([
        {
            username: 'quocthinhle2001@gmail.com',
            password: BcryptService.getSingleton().hash('Thinh12345'),
            fullname: 'Anh Fus pro'
        }
    ]);

    // @ts-ignore
    await knex.table('users_roles').insert([
        {
            user_id: id,
            // @ts-ignore
            role_id: (roles.find(role => role.name === ROLES.ADMIN)).id
        },
        {
            user_id: id,
            // @ts-ignore
            role_id: (roles.find(role => role.name === ROLES.MODERATOR)).id
        }
    ]);
}

/**
 * @param {import("knex")} knex
 */

export function down(knex){}
