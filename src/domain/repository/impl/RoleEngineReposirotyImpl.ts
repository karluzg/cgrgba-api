
import { error } from "console";
import { TokenSession } from "../../model/TokenSession"
//import { myDataSource } from "../web-api/meta-inf/data-source";
const myDataSource = require("../../meta-inf/data-source");
import { IUserEngineRepository } from "../IUserEngineRepository";
import { injectable } from 'tsyringe'
import { User } from "../../model/User";
import { IRoleEngineRepository } from "../IRoleEngineRepository";
import { Role } from "../../model/Role";


@injectable()
export class RoleEngineRepositoryImpl implements IRoleEngineRepository {
      public async saveRole(role: Role): Promise<Role> {
            const userRepository = myDataSource.getRepository(Role)
            return await userRepository.save(role)
      }

      public async finRoleByName(roleName: string): Promise<Role> {
            const userRepository = myDataSource.getRepository(Role)
            return await  userRepository.createQueryBuilder('role')
            .where('role.roleName = :roleName', { roleName: roleName }).getOne()
      }
}
