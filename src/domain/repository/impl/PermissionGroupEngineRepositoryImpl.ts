
import { Role } from "../../model/Role";
import { User } from "../../model/User";
import { injectable } from 'tsyringe'
import { IPermissionGroupEngineRepository } from "../IPermissionGroupEngineRepository";
import { PermissionGroup } from "../../model/PermissionGroup";

const myDataSource = require('../../../domain/meta-inf/data-source');
const userRepository = myDataSource.getRepository(PermissionGroup)
const permissionRepository = myDataSource.getRepository(PermissionGroup)

@injectable()
export class PermissionGroupEngineRepositoryImpl implements IPermissionGroupEngineRepository {
   async  finPermissionGroupByCode(permissionGroupCode: string): Promise<PermissionGroup> {

            return await  userRepository.createQueryBuilder('permissionGroup')
            .where('permissionGroup.permissionGroupCode = :permissionGroupCode', { permissionGroupCode: permissionGroupCode }).getOne()
   }
   async savePermissionGroup(permissionGroup: PermissionGroup): Promise<PermissionGroup> {

      return await permissionRepository.save(permissionGroup)
   }

}


