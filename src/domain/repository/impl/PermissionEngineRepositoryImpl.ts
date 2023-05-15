
import { NotFoundException } from "../../../infrestructure/exceptions/NotFoundExcecption";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
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

   public async savePermission(permission: Permission): Promise<Permission> {
      const permissionRepository = myDataSource.getRepository(Permission);
      return await permissionRepository.save(permission);
    }
    
    public async findPermissionByCode(permissionCode: string): Promise<Permission> {
      const permission = await permissionRepository.createQueryBuilder('permission')
        .where('permission.code = :permissionCode', { permissionCode })
        .getOne();
    
      if (!permission) {
        throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_NOT_FOUND);
      }
    
      return permission;
    }
    
    public async findByPermissionId(permissionId: number): Promise<Permission> {
      const permission = await permissionRepository.createQueryBuilder('permission')
        .where('permission.id = :permissionId', { permissionId })
        .getOne();
    
      if (!permission) {
        throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_NOT_FOUND);
      }
    
      return permission;
    }
    
    public async isUserOperationAllowed(operationId: number, userId: number): Promise<boolean> {
      const isAllowed = await userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'role')
        .leftJoinAndSelect('role.permissions', 'permission')
        .where('user.id = :userId', { userId })
        .andWhere('permission.id = :operationId', { operationId })
        .getExists();
    
      return isAllowed;
    }
    
    public async findAllPermissions(page: number, size: number): Promise<Permission[]> {
      const skipCount = (page - 1) * size;
    
      const permissions = await permissionRepository.createQueryBuilder('permission')
        .skip(skipCount)
        .take(size)
        .getMany();
    
      return permissions;
    }
    
    public async deletePermission(id: number): Promise<void> {
      const permission = await permissionRepository.createQueryBuilder('permission')
        .where('permission.id = :id', { id })
        .getOne();
    
      if (!permission) {
        throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_NOT_FOUND);
      }
    
      await permissionRepository.remove(permission);
    }
    
    public async updatePermission(permissionId: number, updatePermissionData: Permission): Promise<Permission> {
      const permission = await permissionRepository.createQueryBuilder('permission')
        .where('permission.id = :id', { id: permissionId })
        .getOne();
    
      if (!permission) {
        throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_NOT_FOUND);
      }
    
      const updatedPermission = Object.assign(permission, updatePermissionData);
      const savedPermission = await permissionRepository.save(updatedPermission);
      return savedPermission;
    }
    

}


