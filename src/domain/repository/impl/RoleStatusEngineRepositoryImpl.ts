import { RoleStatus } from "../../model/RoleStatus";
import { IRoleStatusEngineRepository } from "../IRoleStatusEngineRepository";

const myDataSource = require('../../../domain/meta-inf/data-source');
const roleStatusEngineRepository = myDataSource.getRepository(RoleStatus)


export class RoleStatusEngineRepositoryImpl implements IRoleStatusEngineRepository{

   async save(roleStatus: RoleStatus): Promise<void> {
        return await roleStatusEngineRepository.save(roleStatus);
    }

    findRoleStatusCode(statusCode: string): Promise<RoleStatus> {

        return roleStatusEngineRepository.createQueryBuilder('roleStatus')
            .where('roleStatus.code = :statusCode', { statusCode })
            .getOne()

    
   }
    
}