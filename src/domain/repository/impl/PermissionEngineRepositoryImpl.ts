
import { Permission } from "../../model/Persmission";
import { Role } from "../../model/Role";
import { User } from "../../model/User";
//import { myDataSource } from "../web-api/meta-inf/data-source";
import { IPermissionEngineRepository } from "../IPermissionEngineRepository";
import { injectable } from 'tsyringe'
const myDataSource = require('../../../domain/meta-inf/data-source');



@injectable()
export class PermissionEngineRepositoryImpl implements IPermissionEngineRepository {

   async findByPermissionId(permissionId: number): Promise<Permission> {

      const permissionRepository = myDataSource.getRepository(Permission)
    
         const permissionEntity = await permissionRepository
            .createQueryBuilder('permission')
            .where('permission.id = :permissionId', { permissionId: permissionId })
            .getOne();

         return permissionEntity;
   }


   async isUserOperationAllowed(operationId: number, userId: number): Promise<boolean> {

      const userRepository = myDataSource.getRepository(User)

      const user = await myDataSource.getRepository(User)
         .createQueryBuilder( 'user')
         .leftJoinAndSelect('user.roles', 'role')
         .leftJoinAndSelect('role.permissions', 'permission')
         .where('user.id = :userId', { userId })
         .andWhere('permission.id = :operationId', { operationId }).getExists();


      return user

 

   }



}


