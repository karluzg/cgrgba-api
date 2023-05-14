

import { injectable } from 'tsyringe'
import { IPermissionGroupEngineRepository } from "../IPermissionGroupEngineRepository";
import { PermissionGroup } from "../../model/PermissionGroup";
import { NotImplementedException } from '../../../infrestructure/exceptions/NotImplementedException';
import { Field } from '../../../infrestructure/exceptions/enum/Field';
import { MiddlewareBusinessMessage } from '../../../infrestructure/response/enum/MiddlewareCustomErrorMessage';

const myDataSource = require('../../../domain/meta-inf/data-source');
const permissionGroupRepository = myDataSource.getRepository(PermissionGroup)

@injectable()
export class PermissionGroupEngineRepositoryImpl implements IPermissionGroupEngineRepository {
   
   public async findPermissionGroupByCode(permissionGroupCode: string): Promise<PermissionGroup> {
      const permissionGroup = await permissionGroupRepository
        .createQueryBuilder('permissionGroup')
        .where('permissionGroup.code = :permissionGroupCode', { permissionGroupCode })
        .getOne();
    
      if (!permissionGroup) {
         throw new NotImplementedException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_GOURP_NOT_FOUND)
      }
    
      return permissionGroup;
    }
    
   public async savePermissionGroup(permissionGroup: PermissionGroup): Promise<PermissionGroup> {

      return permissionGroupRepository.save(permissionGroup)
   }

   public async updatePermissionGroup(id: number, updatedData: PermissionGroup): Promise<PermissionGroup> {
      const existingPermissionGroup = await permissionGroupRepository.findOne(id);
      if (!existingPermissionGroup) {
         throw new NotImplementedException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_GOURP_NOT_FOUND)
      }

      const updatedPermissionGroup = Object.assign(existingPermissionGroup, updatedData);
      const savedPermissionGroup = await permissionGroupRepository.save(updatedPermissionGroup);
      return savedPermissionGroup;
   }

   public async deletePermissionGroup(id: number): Promise<void> {
      const permissionGroup = await permissionGroupRepository.findOne(id);
      if (!permissionGroup) {
         throw new NotImplementedException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_GOURP_NOT_FOUND)
      }

      await permissionGroupRepository.remove(permissionGroup);
   }

   public async findAllPermissionGroups(page: number, size: number): Promise<PermissionGroup[]> {
      const skipCount = (page - 1) * size;
      const permissionGroups = await permissionGroupRepository.find({
         skip: skipCount,
         take: size,
      });

      return permissionGroups;
   }


}


