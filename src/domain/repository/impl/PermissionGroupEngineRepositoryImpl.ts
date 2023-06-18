
import { injectable } from 'tsyringe'
import { IPermissionGroupEngineRepository } from "../IPermissionGroupEngineRepository";
import { PermissionGroup } from "../../model/PermissionGroup";
import { Field } from '../../../infrestructure/exceptions/enum/Field';
import { MiddlewareBusinessMessage } from '../../../infrestructure/response/enum/MiddlewareCustomMessage';
import { PageImpl } from '../../../infrestructure/pageable-manager/PageImpl';
import { IPage } from '../../../infrestructure/pageable-manager/IPage';
import { InvalidParametersException } from '../../../infrestructure/exceptions/InvalidParametersException';

const myDataSource = require('../../../domain/meta-inf/data-source');
const permissionGroupRepository = myDataSource.getRepository(PermissionGroup)

@injectable()
export class PermissionGroupEngineRepositoryImpl implements IPermissionGroupEngineRepository {
   
   public async findPermissionGroupByCode(permissionGroupCode: string): Promise<PermissionGroup> {
      const permissionGroup = await permissionGroupRepository
        .createQueryBuilder('permissionGroup')
        .where('permissionGroup.code = :permissionGroupCode', { permissionGroupCode })
        .getOne();
    
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
        throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_GROUP_NOT_EXIST);
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
        throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_GROUP_NOT_EXIST);
      }
    
      await permissionGroupRepository.remove(permissionGroup);
    }
    
    public async findAllPermissionGroups(page: number, size: number, orderColumn?: string, direction?: 'ASC' | 'DESC'): Promise<IPage<PermissionGroup>> {
      const skipCount = (page - 1) * size;
  
      let queryBuilder = permissionGroupRepository.createQueryBuilder('permissionGroup')
            .skip(skipCount)
            .take(size);
  
     
  
      if (orderColumn && direction) {
            queryBuilder = queryBuilder.orderBy(`permissionGroup.${orderColumn}`, direction);
      }
  
  
      const [userList, totalRows] = await queryBuilder.getManyAndCount();
      const totalPages = Math.ceil(totalRows / size);
  
  
  
      return new PageImpl<PermissionGroup>(userList, page, size, totalRows, totalPages)
    }

}


