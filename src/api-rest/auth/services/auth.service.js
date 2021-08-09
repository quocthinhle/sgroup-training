import { UserService } from '../../users/user.service';
import { logger } from '../../../common/utils/winston';
import { UnAuthorizedException } from '../../../libs/http-exception/exceptions/unauthorized';
import { jwtPayload } from '../dto/jwt-payload';
import { profileResponse } from '../dto/profile-response';
import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';
import { UserRoleRepository } from '../../users/user-roles.repository';

export class AuthService {
    /**
     * @type {AuthService}
     */
    static #instance;

    static getSingleton() {
        if (!AuthService.#instance) {
            AuthService.#instance = new AuthService(
                UserService.getInstance(),
                BcryptService.getSingleton(),
                JwtService.getInstance(),
                UserRoleRepository.getInstance()
            );
            logger.info(`[${AuthService.name}] is bundling`);
        }
        return AuthService.#instance;
    }

    /**
     * @type {UserService}
     */
    #userService;

    /**
     * @type {BcryptService}
     */
    #bcryptService;

    /**
     * @type {JwtService}
     */
    #jwtService;

    /**
     * @type {UserRoleRepository}
     */
    #userRoles

    constructor(userService, bcryptService, jwtService, userRoles) {
        this.#userService = userService;
        this.#bcryptService = bcryptService;
        this.#jwtService = jwtService;
        this.#userRoles = userRoles;
    }

    async register(body) {
        body.password = this.#bcryptService.hash(body.password);
        delete body.confirm_password;
        // select id -> visitor
        const userId = await this.#userService.createOneAndReturn(body);
        const role_id = await this.#userRoles.createOne({
            user_id: userId,
            role_id: 3
        }).returning(role_id);
        return {
            userId,
            role_id
        };
    }

    async login(body) {
        const user = await this.#userService.getByUsernameWithRoles(body.username);

        if (!user || !this.#bcryptService.compare(body.password, user.password)) {
            throw new UnAuthorizedException("Username/ password is incorrect");
        }

        return profileResponse(
            user,
            this.#jwtService.sign(jwtPayload(user.id, user.roles))
        );
    }
}
