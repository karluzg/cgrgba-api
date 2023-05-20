

const myDataSource = require("../../meta-inf/data-source");
import { injectable } from 'tsyringe'
import { IRoleEngineRepository } from "../IRoleEngineRepository";
import { Role } from "../../model/Role";
import { Permission } from '../../model/Permission';
import { NotFoundException as NotFoundException } from '../../../infrestructure/exceptions/NotFoundExcecption';
import { Field } from '../../../infrestructure/exceptions/enum/Field';
import { MiddlewareBusinessMessage } from '../../../infrestructure/response/enum/MiddlewareCustomErrorMessage';

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

  public async findAllRoles(page: number, size: number): Promise<Role[]> {
    const skipCount = (page - 1) * size;

    const roles = await roleRepository.createQueryBuilder('role')
      .skip(skipCount)
      .take(size)
      .getMany();

    return roles;
  }

  public async updateRole(roleId: number, updateRoleData: Role): Promise<Role> {
    const role = await roleRepository.createQueryBuilder('role')
      .where('role.id = :id', { id: roleId })
      .getOne();

    if (!role) {
      throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.ROLE_NOT_FOUND);
    }

    const updatedRole = Object.assign(role, updateRoleData);
    return roleRepository.save(updatedRole);
  }

  public async deleteRole(id: number): Promise<void> {
    const role = await roleRepository.createQueryBuilder('role')
      .where('role.id = :id', { id })
      .getOne();

    if (!role) {
      throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.ROLE_NOT_FOUND);
    }

    await roleRepository.remove(role);
  }

  public async addPermissionToRole(roleId: number, permissionCode: string): Promise<Role> {
    const role = await roleRepository.createQueryBuilder('role')
      .where('role.id = :id', { id: roleId })
      .getOne();

    if (!role) {
      throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.ROLE_NOT_FOUND);
    }

    const permission = await permissionRepository.createQueryBuilder('permission')
      .where('permission.code = :code', { code: permissionCode })
      .getOne();

    if (!permission) {
      throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_NOT_FOUND);
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
      throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.ROLE_NOT_FOUND);
    }

    const permission = await permissionRepository.createQueryBuilder('permission')
      .where('permission.code = :code', { code: permissionCode })
      .getOne();

    if (!permission) {
      throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_NOT_FOUND);
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

}
