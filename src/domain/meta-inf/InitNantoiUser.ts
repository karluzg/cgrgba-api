import { container } from "tsyringe"
import logger from "../../infrestructure/config/logger"
import { PasswordValidator } from "../../infrestructure/validator/managers/PasswordValidator"
import { User } from "../model/User"
import { UserStatusEnum, UserStatusMapper } from "../model/enum/UserStatusEnum"
import { IUserEngineRepository } from "../repository/IUserEngineRepository"
import { IRoleEngineRepository } from "../repository/IRoleEngineRepository"
import { Role } from "../model/Role"
import { IPermissionEngineRepository } from "../repository/IPermissionEngineRepository"
import { OperationNamesEnum, getOperationNameDescription } from "../model/enum/OperationNamesEnum"
import { PermissionGroup } from "../model/PermissionGroup"
import { IPermissionGroupEngineRepository } from "../repository/IPermissionGroupEngineRepository"
import { Permission } from "../model/Permission"
import { UserStatus } from "../model/UserStatus"
import { IUserStatusEngineRepository } from "../repository/IUserStatusEngineRepository"
import { generatePermisionGroupDescription } from "../model/enum/PermissionGroupEnum"
import { stat } from "fs"
import { InvalidParametersException } from "../../infrestructure/exceptions/InvalidParametersException"
import { Field } from "../../infrestructure/exceptions/enum/Field"
import { MiddlewareBusinessMessage } from "../../infrestructure/response/enum/MiddlewareCustomErrorMessage"

export async function initNantoiUser() {

    //const permissionGourp = await cretePermissionGroupAdmin()
    const permissions = await cretePermissions();
    const role = await creteRoleAdmin(permissions);
    await createUserNantoi(role);

}

async function createUserNantoi(role: Role) {

    const userStatusEngineRepository = container.resolve<IUserStatusEngineRepository>("IUserStatusEngineRepository");
    logger.info("[createUserNantoi] Perform dependency injection for IUserEngineRepository")
    const userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")
    //add new user
    logger.info("[createUserNantoi] Find User by email")

    let nantoiUser: User;
    try {
        nantoiUser = await userRepository.findUserByEmail("nantoi@nantoi.com")
    } catch (error) {
        nantoiUser = null;
    }

    if (!nantoiUser) {
        logger.info("[createUserNantoi] Creatting salt and hash from password")
        const passwordValidator = new PasswordValidator();
        const salt = passwordValidator.createSalt()
        const hash = passwordValidator.generateHash("Nantoi2023!", await salt)


        await createUserStatus(userStatusEngineRepository);
        const statusFounded = await userStatusEngineRepository.findStatusCode(UserStatusEnum.ACTIVE)
        if (!statusFounded) {
            throw new InvalidParametersException(Field.USER_STATUS_CODE, MiddlewareBusinessMessage.USER_STATUS_CODE_MANDATORY)
        }

        const user = new User(); // here, he create user status as new
        user.email = "nantoi@nantoi.com"
        user.fullName = "Admin Nantoi"
        user.mobileNumber = "123456789"
        user.passwordHash = await hash;
        user.passwordSalt = await salt;
        user.status = statusFounded;
        user.activationDate = new Date();
        user.roles = [role]

        logger.info("[createUserNantoi] Creating Nantoi User")
        userRepository.saveUser(user)
    }
}

async function creteRoleAdmin(permissions: Permission[]) {
    logger.info("[creteRoleAdmin] Perform dependency injection for IRoleEngineRepository")
    const roleRepository = container.resolve<IRoleEngineRepository>("IRoleEngineRepository")
    //add new user
    logger.info("[creteRoleAdmin] Find role by name")
    let adminRole: Role;
    try {
        adminRole = await roleRepository.findRoleByName("ADMIN")
    } catch (error) {
        adminRole = null
    }
    if (!adminRole) {

        const role = new Role();
        role.isAdmin = true
        role.description = "Administrator"
        role.name = "ADMIN"
        role.permissions = permissions
        logger.info("[creteRoleAdmin] Creating Admin")
        return roleRepository.saveRole(role)
    }
    else {
        adminRole.permissions = permissions
        return roleRepository.saveRole(adminRole)
    }

}
async function createUserStatus(userStatusEngineRepository: IUserStatusEngineRepository): Promise<void> {


    for (const status in UserStatusEnum) {
        if (Object.prototype.hasOwnProperty.call(UserStatusEnum, status)) {
            const userStatus = new UserStatus(status);
            userStatus.description = await UserStatusMapper.getUserStatusDescription(status);
            userStatus.listed = true;

            await userStatusEngineRepository.save(userStatus);
        }
    }

}


async function cretePermissions() {
    logger.info("[cretePermissions] Perform dependency injection for IPermissionEngineRepository")
    const permissionRepository = container.resolve<IPermissionEngineRepository>("IPermissionEngineRepository")

    logger.info("[cretePermissions] Perform dependency injection for IPermissionGroupEngineRepository")
    const permissionGroupRepository = container.resolve<IPermissionGroupEngineRepository>("IPermissionGroupEngineRepository")

    //add new user
    const permissions = []
    for (const operation in OperationNamesEnum) {
        if (isNaN(Number(operation))) {
            logger.info("[cretePermissions] Find permission by code " + OperationNamesEnum[operation])
            let dbPermission: Permission;
            try {

                dbPermission = await permissionRepository.findPermissionByCode(operation)
            } catch (error) {

                dbPermission = null
            }


            if (!dbPermission) {


                const group = operation.split("_")[0];

                logger.info("[cretePermissions] Find role by name")
                let adminPermission: PermissionGroup

                try {
                    adminPermission = await permissionGroupRepository.findPermissionGroupByCode(group)
                } catch (error) {
                    adminPermission = null
                }

                if (!adminPermission) {

                    const permission = new PermissionGroup();
                    permission.code = group
                    permission.description = await generatePermisionGroupDescription(group)
                    logger.info("[cretePermissions] Creating " + group)

                    if (group != "SESSION") {
                        adminPermission = await permissionGroupRepository.savePermissionGroup(permission)
                    }

                }

                const permission = new Permission();
                permission.code = operation
                permission.id = parseInt(OperationNamesEnum[operation]);


                permission.description = await getOperationNameDescription(operation)
                permission.permissionGroup = adminPermission

                logger.info("[cretePermissions] Creating Admin")


                // loging and and logout are not part of permission or permission group
                if (operation != "SESSION_LOGIN" && operation != "SESSION_LOGOUT") {

                    const newPermisson = await permissionRepository.savePermission(permission)

                    permissions.push(newPermisson)
                }
            } else
                permissions.push(dbPermission)
        }
    }
    return permissions

}

/*async function cretePermissionGroupAdmin() {
    logger.info("[cretePermissionGroupAdmin] Perform dependency injection for IPermissionGroupEngineRepository")
    const roleRepository = container.resolve<IPermissionGroupEngineRepository>("IPermissionGroupEngineRepository")
    //add new user
    logger.info("[cretePermissionGroupAdmin] Find role by name")
    const adminPermission = await roleRepository.finPermissionGroupByCode("USERS")

    if (!adminPermission) {

        const permission = new PermissionGroup();
        permission.code = "ADMIN"
        permission.description = "Administrator"
        logger.info("[cretePermissionGroupAdmin] Creating Admin")
        return await roleRepository.savePermissionGroup(permission)

    }

    return adminPermission

}*/