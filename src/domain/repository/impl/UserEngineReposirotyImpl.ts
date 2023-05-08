

import { IUserEngineRepository } from "../IUserEngineRepository";
import { injectable } from 'tsyringe'
import { User } from "../../model/User";

const myDataSource = require("../../meta-inf/data-source");
const userRepository = myDataSource.getRepository(User)

@injectable()
export class UserEngineRepositoryImpl implements IUserEngineRepository {
     
      async findUserByEmail(userEmail: string): Promise<User> {

            return await  userRepository.createQueryBuilder('user')
                  .where('user.userEmail = :userEmail', { userEmail: userEmail }).getOne()
      }
      public async saveUser(user: User): Promise<User> {
            return await userRepository.save(user)
      }



}
