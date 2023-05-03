
import { error } from "console";
import { TokenSession } from "../../model/TokenSession"
//import { myDataSource } from "../web-api/meta-inf/data-source";
const myDataSource = require("../../meta-inf/data-source");
import { IUserEngineRepository } from "../IUserEngineRepository";
import { injectable } from 'tsyringe'
import { User } from "../../model/User";


@injectable()
export class UserRepositoryEngineImpl implements IUserEngineRepository {


      public saveUser(user:User): User {


            const userRepository = myDataSource.getRepository(User)

            return userRepository.createQueryBuilder('tokenSession').insert(user).getOne()


      }
}
