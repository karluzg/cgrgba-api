
import { Permission } from "../../model/Persmission";
import { Role } from "../../model/Role";
import { User } from "../../model/User";
//import { myDataSource } from "../web-api/meta-inf/data-source";
import { IPermissionEngineRepository } from "../IPermissionEngineRepository";
import { injectable } from 'tsyringe'
import { IPermissionGroupEngineRepository } from "../IPermissionGroupEngineRepository";
import { PermissionGroup } from "../../model/PermissionGroup";
const myDataSource = require('../../../domain/meta-inf/data-source');



@injectable()
export class PermissionGroupEngineRepositoryImpl implements IPermissionGroupEngineRepository {
   async  finPermissionGroupByCode(permissionGroupCode: string): Promise<PermissionGroup> {
      const userRepository = myDataSource.getRepository(PermissionGroup)
            return await  userRepository.createQueryBuilder('permissionGroup')
            .where('permissionGroup.permissionGroupCode = :permissionGroupCode', { permissionGroupCode: permissionGroupCode }).getOne()
   }
   async savePermissionGroup(permissionGroup: PermissionGroup): Promise<PermissionGroup> {
      const permissionRepository = myDataSource.getRepository(PermissionGroup)
      return await permissionRepository.save(permissionGroup)
   }

}


