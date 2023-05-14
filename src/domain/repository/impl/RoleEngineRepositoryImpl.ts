

const myDataSource = require("../../meta-inf/data-source");
import { injectable } from 'tsyringe'
import { IRoleEngineRepository } from "../IRoleEngineRepository";
import { Role } from "../../model/Role";
import { Permission } from '../../model/Permission';
import { NotFoundExcecption } from '../../../infrestructure/exceptions/NotFoundExcecption';
import { Field } from '../../../infrestructure/exceptions/enum/Field';
import { MiddlewareBusinessMessage } from '../../../infrestructure/response/enum/MiddlewareCustomErrorMessage';

const roleRepository = myDataSource.getRepository(Role)
const permissionRepository = myDataSource.getRepository(Permission)

@injectable()
export class RoleEngineRepositoryImpl implements IRoleEngineRepository {

      public async saveRole(role: Role): Promise<Role> {

            return roleRepository.save(role)
      }

      public async findRoleById(roleId: number): Promise<Role | undefined> {
            return roleRepository.findOne(roleId);
      }

      public async findRoleByName(roleName: string): Promise<Role> {
            const role = await roleRepository.findOne({ where: { name: roleName } });

            if (!role) {
                  throw new NotFoundExcecption(Field.SYSTEM, MiddlewareBusinessMessage.ROLE_NOT_FOUND)
            }

            return role;
      }

      public async findAllRoles(page: number, size: number): Promise<Role[]> {
            const skipCount = (page - 1) * size;

            const roles = await roleRepository.find({
                  skip: skipCount,
                  take: size,
            });

            return roles;
      }


      public async updateRole(roleId: number, updateRoleData: Role): Promise<Role> {
            const role = await roleRepository.findOne(roleId);

            if (!role) {
                  // Tratar erro caso a role não seja encontrada
                  throw new NotFoundExcecption(Field.SYSTEM, MiddlewareBusinessMessage.ROLE_NOT_FOUND)
            }

            // Atualizar os dados da role com base no updateRoleDto
            const updateRole = Object.assign(role, updateRoleData);
            return roleRepository.save(updateRole);
      }

      public async deleteRole(id: number): Promise<void> {
            const role = await roleRepository.findOne(id);

            if (!role) {
                  throw new NotFoundExcecption(Field.SYSTEM, MiddlewareBusinessMessage.ROLE_NOT_FOUND);
            }

            await roleRepository.remove(role);
      }

      public async addPermissionToRole(roleId: number, permissionCode: string): Promise<Role> {
            const role = await roleRepository.findOne(roleId);

            if (!role) {
                  // Tratar erro caso a role não seja encontrada
                  throw new NotFoundExcecption(Field.SYSTEM, MiddlewareBusinessMessage.ROLE_NOT_FOUND)
            }

            const permission = await permissionRepository.findOne({ where: { code: permissionCode } });

            if (!permission) {
                  // Tratar erro caso a permissão não seja encontrada
                  throw new NotFoundExcecption(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_NOT_FOUND)
            }

            role.permissions.push(permission);
            const updatedRole = await roleRepository.save(role);
            return updatedRole;
      }


      public async removePermissionFromRole(roleId: number, permissionCode: string): Promise<Role> {
            const role = await roleRepository.findOne(roleId);

            if (!role) {
                  // Tratar erro caso a role não seja encontrada
                  throw new NotFoundExcecption(Field.SYSTEM, MiddlewareBusinessMessage.ROLE_NOT_FOUND)
            }

            const permission = await permissionRepository.findOne({ where: { code: permissionCode } });

            if (!permission) {
                  // Tratar erro caso a permissão não seja encontrada
                  throw new NotFoundExcecption(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_NOT_FOUND)
            }

            role.permissions = role.permissions.filter(p => p.id !== permission.id);
            const updatedRole = await roleRepository.save(role);
            return updatedRole;
      }

      public async getRolePermissions(roleId: number): Promise<Permission[]> {
            const role = await roleRepository.findOne(roleId, { relations: ["permissions"] });

            if (!role) {
                  // Tratar erro caso a role não seja encontrada
                  throw new NotFoundExcecption(Field.SYSTEM, MiddlewareBusinessMessage.ROLE_NOT_FOUND)
            }

            const permissions = role.permissions;
            return permissions;
      }


}
