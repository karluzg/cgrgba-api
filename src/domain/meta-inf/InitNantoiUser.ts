import { container } from "tsyringe"
import logger from "../../infrestructure/config/logger"
import { PasswordValidator } from "../../infrestructure/validator/managers/PasswordValidator"
import { User } from "../model/User"
import { UserStatusEnum } from "../model/enum/UserStatus"
import { IUserEngineRepository } from "../repository/IUserEngineRepository"

 export async function initNantoiUser() {

    logger.info("[initNantoiUSer] Perform dependency injection for IUserEngineRepository")
    const userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")
    //add new user
    logger.info("[initNantoiUSer] Find User by email")
    const nantoiUser = await userRepository.findUserByEmail("nantoi@nantoi.com")

    if (!nantoiUser) {
        logger.info("[initNantoiUSer] Creatting salt and hash from password")
        const passwordValidator = new PasswordValidator();
        const salt = passwordValidator.createSalt()
        const hash = passwordValidator.generateHash("Nantoi2023!", await salt)

        const user = new User();
        user.userEmail = "nantoi@nantoi.com"
        user.userFullName = "Admin Nantoi"
        user.userMobileNumber = "123456789"
        user.userCreationDate= new Date
        user.passwordHash = await hash;
        user.passwordSalt = await salt;
        user.userStatus = UserStatusEnum.NEW;


        logger.info("[initNantoiUSer] Creating Nantoi User")
        userRepository.saveUser(user)
    }}