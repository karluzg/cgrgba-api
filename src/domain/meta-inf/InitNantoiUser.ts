import { container } from "tsyringe"
import logger from "../../infrestructure/config/logger"
import { PasswordValidator } from "../../infrestructure/validator/managers/PasswordValidator"
import { User } from "../model/User"
import { UserStatusEnum } from "../model/enum/UserStatusEnum"
import { IUserEngineRepository } from "../repository/IUserEngineRepository"
import { IRoleEngineRepository } from "../repository/IRoleEngineRepository"
import { Role } from "../model/Role"
import { IPermissionEngineRepository } from "../repository/IPermissionEngineRepository"
import { OperationNamesEnum } from "../model/enum/OperationNamesEnum"
import { PermissionGroup } from "../model/PermissionGroup"
import { IPermissionGroupEngineRepository } from "../repository/IPermissionGroupEngineRepository"
import { Permission } from "../model/Permission"

export async function initNantoiUser() {

   //const permissionGourp = await cretePermissionGroupAdmin()
   const permissions = await cretePermissions()
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
        user.email = "nantoi@nantoi.com"
        user.fullName = "Admin Nantoi"
        user.mobileNumber = "123456789"
        user.passwordHash = await hash;
        user.passwordSalt = await salt;
        user.status = UserStatusEnum.ACTIVE;
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
    const adminRole = await roleRepository.findRoleByName("ADMIN")

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
            const dbPermission = await permissionRepository.findPermissionByCode(operation)

            if (!dbPermission) {


                const group= operation.split("_")[0];

                logger.info("[cretePermissions] Find role by name")
                let adminPermission = await permissionGroupRepository.findPermissionGroupByCode(group)
            
                if (!adminPermission) {
            
                    const permission = new PermissionGroup();
                    permission.code = group
                    permission.description = group
                    logger.info("[cretePermissions] Creating "+group)
                    adminPermission= await permissionGroupRepository.savePermissionGroup(permission)
            
                }

                const permission = new Permission();
                permission.code = operation
                permission.id = parseInt(OperationNamesEnum[operation]);
                permission.description = operation
                permission.permissionGroup = adminPermission

                logger.info("[cretePermissions] Creating Admin")
                const newPermisson = await permissionRepository.savePermission(permission)
                permissions.push(newPermisson)
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