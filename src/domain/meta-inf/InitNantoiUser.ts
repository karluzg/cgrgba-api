import { container } from "tsyringe"
import logger from "../../infrestructure/config/logger"
import { PasswordValidator } from "../../infrestructure/validator/managers/PasswordValidator"
import { User } from "../model/User"
import { UserStatusEnum } from "../model/enum/UserStatusEnum"
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
import { InvalidParametersException } from "../../infrestructure/exceptions/InvalidParametersException"
import { Field } from "../../infrestructure/exceptions/enum/Field"
import { MiddlewareBusinessMessage } from "../../infrestructure/response/enum/MiddlewareCustomMessage"
import { EnumOperationTemplate } from "../../infrestructure/template/EnumOperationTemplate"
import { PlataformConfig } from "../../infrestructure/config/plataform"
import { RoleStatus } from "../model/RoleStatus"
import { RoleStatusEnum } from "../model/enum/RolestatusEnum"
import { IRoleStatusEngineRepository } from "../repository/IRoleStatusEngineRepository"

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
        nantoiUser = await userRepository.findUserByEmail(PlataformConfig.nantoi.email)
    } catch (error) {
        nantoiUser = null;
    }

    if (!nantoiUser) {
        logger.info("[createUserNantoi] Creatting salt and hash from password")
        const passwordValidator = new PasswordValidator();
        const salt = passwordValidator.createSalt()
        const hash = passwordValidator.generateHash(PlataformConfig.nantoi.password, await salt)


        await createUserStatus(userStatusEngineRepository);
        
        const statusFounded = await userStatusEngineRepository.findStatusCode("ACTIVE")
        if (!statusFounded) {
            throw new InvalidParametersException(Field.USER_STATUS_CODE, MiddlewareBusinessMessage.USER_STATUS_CODE_MANDATORY)
        }

        const user = new User(); // here, he create user status as new
        user.email = PlataformConfig.nantoi.email
        user.fullName = PlataformConfig.nantoi.fullName
        user.mobileNumber = PlataformConfig.nantoi.mobileNumaber
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
    const roleStatusRepository = container.resolve<IRoleStatusEngineRepository>("IRoleStatusEngineRepository")
    
    //add new user
    logger.info("[creteRoleAdmin] Find role by name")
    let adminRole: Role;
    try {
        adminRole = await roleRepository.findRoleByName("ADMIN")
        logger.info("[creteRoleAdmin] Role was found:" + adminRole)
    } catch (error) {
        adminRole = null
    }
    if (!adminRole) {

        const role = new Role();

        await createRoleStatus(roleStatusRepository)

        const statusFounded = await roleStatusRepository.findRoleStatusCode("ACTIVE")
        if (!statusFounded) {
            throw new InvalidParametersException(Field.ROLE_STATUS_CODE, MiddlewareBusinessMessage.ROLE_NOT_EXIST)
        }

        role.isAdmin = true
        role.description = "Administrator"
        role.name = "ADMIN"
        role.permissions = permissions
        role.roleStatus=statusFounded
        logger.info("[creteRoleAdmin] Creating Admin")
        return roleRepository.saveRole(role)
    }
    else {
        adminRole.permissions = permissions
        return roleRepository.saveRole(adminRole)
    }

}

async function createRoleStatus(roleStatusRepository:IRoleStatusEngineRepository) {

    const enumInfo = new EnumOperationTemplate<RoleStatusEnum>(RoleStatusEnum);

    for (const status in RoleStatusEnum) {
        if (Object.prototype.hasOwnProperty.call(RoleStatusEnum, status)) {
            const roleStatus = new RoleStatus(status);
            roleStatus.description =  enumInfo.getDescription(status);
            roleStatus.listed = true

             const st:RoleStatusEnum= enumInfo.getEnumKey(status);
             const at= enumInfo.getKey(RoleStatusEnum.ACTIVE);

            await roleStatusRepository.save(roleStatus);
        }
    }
}
async function createUserStatus(userStatusEngineRepository: IUserStatusEngineRepository): Promise<void> {

 
    const enumInfo = new EnumOperationTemplate<UserStatusEnum>(UserStatusEnum);

    for (const status in UserStatusEnum) {
        if (Object.prototype.hasOwnProperty.call(UserStatusEnum, status)) {
            const userStatus = new UserStatus(status);
            userStatus.description =  enumInfo.getDescription(status);
            userStatus.listed = true;

             const st:UserStatusEnum= enumInfo.getEnumKey(status);
             const at= enumInfo.getKey(UserStatusEnum.ACTIVE);

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
    logger.info("[cretePermissions] Start creating all permission automatically..")
    for (const operation in OperationNamesEnum) {
        if (isNaN(Number(operation))) {

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

                    const permissionGroup = new PermissionGroup();
                    permissionGroup.code = group
                    permissionGroup.description = await generatePermisionGroupDescription(group)
                    logger.info("[cretePermissions] Creating " + group)
                    console.log(permissionGroup)

                    if (group != "SESSION") {
                        adminPermission = await permissionGroupRepository.savePermissionGroup(permissionGroup)
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
    logger.info("[cretePermissions] End creating all permission automatically..")
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