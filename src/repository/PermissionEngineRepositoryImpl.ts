
import { Permission } from "../domain-model/Persmission";
import { Role } from "../domain-model/Role";
import { UserRole } from "../domain-model/UserRole";
import { User } from "../domain-model/User";
//import { myDataSource } from "../web-api/meta-inf/data-source";
import { myDataSource } from "../web-api/meta-inf/data-source";
import { IPermissionEngineRepository } from "./engine/IPermissionEngineRepository";
import { injectable } from 'tsyringe'




@injectable()
export class PermissionEngineRepositoryImpl implements IPermissionEngineRepository {

   async findByPermissionId(permissionId: number): Promise<Permission | null> {

      const permissionRepository = myDataSource.getRepository(Permission)
      return await permissionRepository
         .createQueryBuilder('permission')
         .where('permission.id = :permissionId', { id: permissionId })
         .getOne()

   }


   async isUserOperationAllowed(operationId: number, userId: number): Promise<boolean | false> {

      return myDataSource.getRepository(User)
         .createQueryBuilder('user')
         .select(['user.id'])
         .leftJoin(UserRole, 'userRole', 'userRole.user.id = user.id')
         .leftJoin(Role, 'role', 'role.id = userRole.role.id')
         .leftJoin(Permission, 'permission', 'permission.id = role.permissions.id')
         .where('permission.id = : operationId', { id: operationId })
         .andWhere('user.id = :userId', { id: userId })
         .setParameter('userId', userId)
         .getExists();

   }


}


