

import { injectable } from 'tsyringe'
import { IPermissionGroupEngineRepository } from "../IPermissionGroupEngineRepository";
import { PermissionGroup } from "../../model/PermissionGroup";
import { NotFoundException as NotFoundException } from '../../../infrestructure/exceptions/NotFoundExcecption';
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
        throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_GOURP_NOT_FOUND);
      }
    
      return permissionGroup;
    }
    
    public async savePermissionGroup(permissionGroup: PermissionGroup): Promise<PermissionGroup> {
      return permissionGroupRepository.createQueryBuilder()
        .insert()
        .values(permissionGroup)
        .execute()
        .then(() => permissionGroup);
    }
    
    public async updatePermissionGroup(id: number, updatedData: PermissionGroup): Promise<PermissionGroup> {
      const existingPermissionGroup = await permissionGroupRepository.createQueryBuilder('permissionGroup')
        .where('permissionGroup.id = :id', { id })
        .getOne();
    
      if (!existingPermissionGroup) {
        throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_GOURP_NOT_FOUND);
      }
    
      const updatedPermissionGroup = Object.assign(existingPermissionGroup, updatedData);
      const savedPermissionGroup = await permissionGroupRepository.save(updatedPermissionGroup);
      return savedPermissionGroup;
    }
    
    public async deletePermissionGroup(id: number): Promise<void> {
      const permissionGroup = await permissionGroupRepository.createQueryBuilder('permissionGroup')
        .where('permissionGroup.id = :id', { id })
        .getOne();
    
      if (!permissionGroup) {
        throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_GOURP_NOT_FOUND);
      }
    
      await permissionGroupRepository.remove(permissionGroup);
    }
    
    public async findAllPermissionGroups(page: number, size: number): Promise<PermissionGroup[]> {
      const skipCount = (page - 1) * size;
      const permissionGroups = await permissionGroupRepository.createQueryBuilder('permissionGroup')
        .skip(skipCount)
        .take(size)
        .getMany();
    
      return permissionGroups;
    }
    

}


