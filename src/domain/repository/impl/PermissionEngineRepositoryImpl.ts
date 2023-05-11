
import { Permission } from "../../model/Permission";
import { Role } from "../../model/Role";
import { User } from "../../model/User";
//import { myDataSource } from "../web-api/meta-inf/data-source";
import { IPermissionEngineRepository } from "../IPermissionEngineRepository";
import { injectable } from 'tsyringe'

const myDataSource = require('../../../domain/meta-inf/data-source');
const permissionRepository = myDataSource.getRepository(Permission)
const userRepository = myDataSource.getRepository(User)

@injectable()
export class PermissionEngineRepositoryImpl implements IPermissionEngineRepository {
   async savePermission(permission: Permission): Promise<Permission> {
      const permissionRepository = myDataSource.getRepository(Permission)
      return await permissionRepository.save(permission)
   }
   async finPermissionByCode(permissionCode: string): Promise<Permission> {

      return await permissionRepository.createQueryBuilder('permission')
            .where('permission.permissionCode = :permissionCode', { permissionCode: permissionCode }).getOne()
   }

   async findByPermissionId(permissionId: number): Promise<Permission> {

      return permissionRepository
            .createQueryBuilder('permission')
            .where('permission.id = :permissionId', { permissionId: permissionId })
            .getOne();


   }


   async isUserOperationAllowed(operationId: number, userId: number): Promise<boolean> {

      return userRepository.createQueryBuilder('user')
         .leftJoinAndSelect('user.roles', 'role')
         .leftJoinAndSelect('role.permissions', 'permission')
         .where('user.id = :userId', { userId })
         .andWhere('permission.id = :operationId', { operationId }).getExists();
   }



}


