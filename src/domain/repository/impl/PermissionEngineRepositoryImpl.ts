
import { Permission } from "../../model/Persmission";
import { Role } from "../../model/Role";
import { UserRole } from "../../model/UserRole";
import { User } from "../../model/User";
//import { myDataSource } from "../web-api/meta-inf/data-source";
import { myDataSource } from "../../meta-inf/data-source";
import { IPermissionEngineRepository } from "../IPermissionEngineRepository";
import { injectable } from 'tsyringe'




@injectable()
export class PermissionEngineRepositoryImpl implements IPermissionEngineRepository {

   findByPermissionId(permissionId: number): Permission {

      let permissionEntity: Permission
      const permissionRepository = myDataSource.getRepository(Permission)

      const permissionQueryBuilder = permissionRepository
         .createQueryBuilder('permission')
         .where('permission.id = :permissionId', { id: permissionId })
         .getOne();


      permissionQueryBuilder.then((permissionEntity) => {
         if (permissionEntity && Object.keys(permissionEntity).length > 0)
            permissionEntity = permissionEntity;
      });


      return permissionEntity;

   }


   isUserOperationAllowed(operationId: number, userId: number): boolean {

      let isOperationAllowed: boolean = true;
      const userRepository = myDataSource.getRepository(User)

      const userQueyBuilder = userRepository.createQueryBuilder('user')
         .select(['user.id'])
         .leftJoin(UserRole, 'userRole', 'userRole.user.id = user.id')
         .leftJoin(Role, 'role', 'role.id = userRole.role.id')
         .leftJoin(Permission, 'permission', 'permission.id = role.permissions.id')
         .where('permission.id = : operationId', { id: operationId })
         .andWhere('user.id = :userId', { id: userId })
         .setParameter('userId', userId)
         .getExists();


      userQueyBuilder.then((result) => {

         if (!result) {
            isOperationAllowed = false;
         }
      });

      return isOperationAllowed;

   }



}


