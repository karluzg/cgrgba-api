import logger from "../../config/logger";
import bcrypt from 'bcrypt';

export class PasswordValidator {

    public async checkPassword(userInputPassword: string, savedHash: String): Promise<boolean> {
        logger.info("[PasswordValidator] check if input passawrd is igual to saved passowrd")
        const match = await bcrypt.compare(userInputPassword, savedHash);
        return match;
    }
    public async createSalt(): Promise<string> {
        logger.info("[PasswordValidator] craeting round salt")
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        return salt;
    }
    public async generateHash(password: string, salt: string): Promise<string> {
        logger.info("[PasswordValidator] genereate hash with password and salt")
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

}