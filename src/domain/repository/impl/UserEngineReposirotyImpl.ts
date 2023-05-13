

import { IUserEngineRepository } from "../IUserEngineRepository";
import { injectable } from 'tsyringe'
import { User } from "../../model/User";

const myDataSource = require("../../meta-inf/data-source");
const userRepository = myDataSource.getRepository(User)

@injectable()
export class UserEngineRepositoryImpl implements IUserEngineRepository {

      async findUserByMobileNumber(userMobileNumber: string): Promise<User> {
            return userRepository.createQueryBuilder('user')
                  .where('user.mobileNumber = :userMobileNumber', { userMobileNumber: userMobileNumber }).getOne()
      }

      async findUserByEmail(userEmail: string): Promise<User> {

            return userRepository.createQueryBuilder('user')
                  .where('user.email = :userEmail', { userEmail: userEmail }).getOne()
      }
      public async saveUser(user: User): Promise<User> {
            return userRepository.save(user)
      }



}
