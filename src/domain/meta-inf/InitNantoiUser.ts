import { container } from "tsyringe"
import logger from "../../infrestructure/config/logger"
import { PasswordValidator } from "../../infrestructure/validator/managers/PasswordValidator"
import { User } from "../model/User"
import { UserStatusEnum } from "../model/enum/UserStatus"
import { IUserEngineRepository } from "../repository/IUserEngineRepository"
import { IRoleEngineRepository } from "../repository/IRoleEngineRepository"
import { Role } from "../model/Role"
import { IPermissionEngineRepository } from "../repository/IPermissionEngineRepository"
import { forEach } from "lodash"
import { OperationNames } from "../operation/OperationNames"
import { Permission } from "../model/Persmission"
import { PermissionGroup } from "../model/PermissionGroup"
import { IPermissionGroupEngineRepository } from "../repository/IPermissionGroupEngineRepository"

export async function initNantoiUser() {

    const permissionGourp = await cretePermissionGroupAdmin()
    const permissions = await cretePermissions(permissionGourp)
    const role = await creteRoleAdmin(permissions)
    await createUserNantoi(role);

}

async function createUserNantoi(role: Role) {

    logger.info("[createUserNantoi] Perform dependency injection for IUserEngineRepository")
    const userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")
    //add new user
    logger.info("[createUserNantoi] Find User by email")
    const nantoiUser = await userRepository.findUserByEmail("nantoi@nantoi.com")

    if (!nantoiUser) {
        logger.info("[createUserNantoi] Creatting salt and hash from password")
        const passwordValidator = new PasswordValidator();
        const salt = passwordValidator.createSalt()
        const hash = passwordValidator.generateHash("Nantoi2023!", await salt)

        const user = new User();
        user.userEmail = "nantoi@nantoi.com"
        user.userFullName = "Admin Nantoi"
        user.userMobileNumber = "123456789"
        user.userCreationDate = new Date
        user.passwordHash = await hash;
        user.passwordSalt = await salt;
        user.userStatus = UserStatusEnum.ACTIVE;
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
    const adminRole = await roleRepository.finRoleByName("ADMIN")

    if (!adminRole) {

        const role = new Role();
        role.isAdmin = true
        role.roleDescription = "Administrator"
        role.roleName = "ADMIN"
        role.permissions = permissions
        logger.info("[creteRoleAdmin] Creating Admin")
        return roleRepository.saveRole(role)
    }
    else {
        adminRole.permissions = permissions
        return roleRepository.saveRole(adminRole)
    }

}

async function cretePermissions(permissionGroup: PermissionGroup) {
    logger.info("[cretePermissions] Perform dependency injection for IPermissionEngineRepository")
    const roleRepository = container.resolve<IPermissionEngineRepository>("IPermissionEngineRepository")
    //add new user
    const permissions = []
    for (const operation in OperationNames) {

        if (isNaN(Number(operation))) {
            logger.info("[cretePermissions] Find permission by code " + OperationNames[operation])
            const dbPermission = await roleRepository.finPermissionByCode(operation)

            if (!dbPermission) {

                const permission = new Permission();
                permission.permissionCode = operation
                permission.id = parseInt(OperationNames[operation]);
                permission.permissionDescription = operation
                permission.permissionGroup = permissionGroup

                logger.info("[cretePermissions] Creating Admin")
                const newPermisson = await roleRepository.savePermission(permission)
                permissions.push(newPermisson)
            } else
                permissions.push(dbPermission)
        }
    }
    return permissions

}

async function cretePermissionGroupAdmin() {
    logger.info("[cretePermissionGroupAdmin] Perform dependency injection for IPermissionGroupEngineRepository")
    const roleRepository = container.resolve<IPermissionGroupEngineRepository>("IPermissionGroupEngineRepository")
    //add new user
    logger.info("[cretePermissionGroupAdmin] Find role by name")
    const adminPermission = await roleRepository.finPermissionGroupByCode("ADMIN")

    if (!adminPermission) {

        const permission = new PermissionGroup();
        permission.permissionGroupCode = "ADMIN"
        permission.permissionGroupDescription = "Administrator"
        logger.info("[cretePermissionGroupAdmin] Creating Admin")
        return await roleRepository.savePermissionGroup(permission)

    }

    return adminPermission

}