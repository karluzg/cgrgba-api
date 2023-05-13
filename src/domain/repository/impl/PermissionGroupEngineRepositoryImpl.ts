

import { injectable } from 'tsyringe'
import { IPermissionGroupEngineRepository } from "../IPermissionGroupEngineRepository";
import { PermissionGroup } from "../../model/PermissionGroup";

const myDataSource = require('../../../domain/meta-inf/data-source');
const userRepository = myDataSource.getRepository(PermissionGroup)
const permissionRepository = myDataSource.getRepository(PermissionGroup)

@injectable()
export class PermissionGroupEngineRepositoryImpl implements IPermissionGroupEngineRepository {
   async  finPermissionGroupByCode(permissionGroupCode: string): Promise<PermissionGroup> {

      return userRepository.createQueryBuilder('permissionGroup')
            .where('permissionGroup.code = :permissionGroupCode', { permissionGroupCode: permissionGroupCode }).getOne()
   }
   async savePermissionGroup(permissionGroup: PermissionGroup): Promise<PermissionGroup> {

      return permissionRepository.save(permissionGroup)
   }

}


