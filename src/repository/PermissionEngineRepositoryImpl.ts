
import { TokenSession } from "../domain-model/session/TokenSession";
import { Permission } from "../domain-model/user-manager/permission/Persmission";
import { Role } from "../domain-model/user-manager/role/Role";
import { UserRole } from "../domain-model/user-manager/role/UserRole";
import { User } from "../domain-model/user-manager/user/User";
import { myDataSource } from "../web-api/meta-inf/data-source";
import { IPermissionEngineRepository } from "./engine/IPermissionEngineRepository";
import {injectable} from 'tsyringe'

const permissionRepository=  myDataSource.getRepository(Permission)

@injectable()
export class PermissionEngineRepositoryImpl  implements IPermissionEngineRepository {

   async findByPermissionId(permissionId: number): Promise<Permission | null> {
    
    return  await  permissionRepository
    .createQueryBuilder('permission')
    .where('permission.id = :permissionId',{id:permissionId})
    .getOne()

    }  


 async  isUserOperationAllowed(operationId: number, userId: number): Promise<boolean | false> {

    return  myDataSource.getRepository(User)
      .createQueryBuilder('user')
      .select(['user.id'])
      .leftJoin(UserRole, 'userRole', 'userRole.user.id = user.id')
      .leftJoin(Role,'role', 'role.id = userRole.role.id')
      .leftJoin(Permission,'permission', 'permission.id = role.permissions.id')
      .where('permission.id = : operationId',{id: operationId})
      .andWhere('user.id = :userId',{id:userId})
      .setParameter('userId',userId)
      .getExists();

    }
      
          
    }
    
    
