import { compareSync, hashSync, genSaltSync } from 'bcryptjs';
import { ConfigService } from "../../../libs/config/config.service"
import { logger } from '../../../common/utils/winston';

export class BcryptService {
    /**
     * @type {BcryptService}
     */
    static #instance;

    static getSingleton() {
        if (!BcryptService.#instance) {
            BcryptService.#instance = new BcryptService(
                Number.parseInt(ConfigService.getInstance().get('SALT_ROUNDS'), 10)
            );
            logger.info(`[${BcryptService.name}] is bundling`);
        }
        return BcryptService.#instance;
    }

    saltRounds;

    /**
     * @param {number} saltRounds
     */
    constructor(saltRounds) {
        this.saltRounds = saltRounds;
    }

    /**
     * @param {string} str normal string
     * @param {string} hashed hashed string
     */
    compare(str, hashed) {
        return compareSync(str, hashed);
    }

    /**
     * @param {string} str to be hashed
     */
    hash(str) {
        const salt = genSaltSync(this.saltRounds);
        return hashSync(str, salt);
    }
}