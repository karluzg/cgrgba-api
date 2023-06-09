

const myDataSource = require("../../meta-inf/data-source");
import { injectable } from 'tsyringe'
import { IRoleEngineRepository } from "../IRoleEngineRepository";
import { Role } from "../../model/Role";
import { Permission } from '../../model/Permission';
import { Field } from '../../../infrestructure/exceptions/enum/Field';
import { MiddlewareBusinessMessage } from '../../../infrestructure/response/enum/MiddlewareCustomMessage';
import { IPage } from '../../../infrestructure/pageable-manager/IPage';
import { PageImpl } from '../../../infrestructure/pageable-manager/PageImpl';
import { InvalidParametersException } from '../../../infrestructure/exceptions/InvalidParametersException';

const roleRepository = myDataSource.getRepository(Role)
const permissionRepository = myDataSource.getRepository(Permission)

@injectable()
export class RoleEngineRepositoryImpl implements IRoleEngineRepository {

  public async saveRole(role: Role): Promise<Role> {

    return roleRepository.save(role)
  }

  public async findRoleById(roleId: number): Promise<Role> {
    return roleRepository.createQueryBuilder('role')
      .where('role.id = :id', { id: roleId })
      .getOne();
  }

  public async findRoleByName(roleName: string): Promise<Role> {
    const role = await roleRepository.createQueryBuilder('role')
      .where('role.name = :name', { name: roleName })
      .getOne();


    return role;
  }

  public async findRolesBy(page: number, size: number, orderColumn?: string, direction?: 'ASC' | 'DESC'): Promise<IPage<Role>> {
    const skipCount = (page - 1) * size;

    let queryBuilder = roleRepository.createQueryBuilder('role')
          .skip(skipCount)
          .take(size);

   

    if (orderColumn && direction) {
          queryBuilder = queryBuilder.orderBy(`role.${orderColumn}`, direction);
    }


    const [userList, totalRows] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(totalRows / size);



    return new PageImpl<Role>(userList, page, size, totalRows, totalPages)
}

  public async updateRole(roleId: number, updateRoleData: Role): Promise<Role> {
    const role = await roleRepository.createQueryBuilder('role')
      .where('role.id = :id', { id: roleId })
      .getOne();

    if (!role) {
      throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.ROLE_NOT_EXIST);
    }

    const updatedRole = Object.assign(role, updateRoleData);
    return roleRepository.save(updatedRole);
  }

  public async deleteRole(id: number): Promise<void> {
    const role = await roleRepository.createQueryBuilder('role')
      .where('role.id = :id', { id })
      .getOne();

    if (!role) {
      throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.ROLE_NOT_EXIST);
    }

    await roleRepository.remove(role);
  }

  public async addPermissionToRole(roleId: number, permissionCode: string): Promise<Role> {
    const role = await roleRepository.createQueryBuilder('role')
      .where('role.id = :id', { id: roleId })
      .getOne();

    if (!role) {
      throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.ROLE_NOT_EXIST);
    }

    const permission = await permissionRepository.createQueryBuilder('permission')
      .where('permission.code = :code', { code: permissionCode })
      .getOne();

    if (!permission) {
      throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_NOT_EXIST);
    }

    role.permissions.push(permission);
    const updatedRole = await roleRepository.save(role);
    return updatedRole;
  }

  public async removePermissionFromRole(roleId: number, permissionCode: string): Promise<Role> {
    const role = await roleRepository.createQueryBuilder('role')
      .where('role.id = :id', { id: roleId })
      .getOne();

    if (!role) {
      throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.ROLE_NOT_EXIST);
    }

    const permission = await permissionRepository.createQueryBuilder('permission')
      .where('permission.code = :code', { code: permissionCode })
      .getOne();

    if (!permission) {
      throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_NOT_EXIST);
    }

    role.permissions = role.permissions.filter(p => p.id !== permission.id);
    const updatedRole = await roleRepository.save(role);
    return updatedRole;
  }

  public async getRolePermissions(roleId: number): Promise<Permission[]> {
    const role = await roleRepository.createQueryBuilder('role')
      .where('role.id = :id', { id: roleId })
      .leftJoinAndSelect('role.permissions', 'permissions')
      .getOne();

    const permissions = role.permissions;
    return permissions;
  }

 async getAllRoles(): Promise<Role[]> {
   return await roleRepository.createQueryBuilder('role').getMany();
  }

}
