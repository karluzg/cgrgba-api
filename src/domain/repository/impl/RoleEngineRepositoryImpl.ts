

const myDataSource = require("../../meta-inf/data-source");
import { injectable } from 'tsyringe'
import { IRoleEngineRepository } from "../IRoleEngineRepository";
import { Role } from "../../model/Role";

const userRepository = myDataSource.getRepository(Role)

@injectable()
export class RoleEngineRepositoryImpl implements IRoleEngineRepository {
      public async saveRole(role: Role): Promise<Role> {

            return userRepository.save(role)
      }

      public async finRoleByName(roleName: string): Promise<Role> {
            return userRepository.createQueryBuilder('role')
                  .where('role.roleName = :roleName', { roleName: roleName }).getOne()
      }
}
