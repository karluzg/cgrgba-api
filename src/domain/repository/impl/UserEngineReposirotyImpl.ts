
const myDataSource = require("../../meta-inf/data-source");
import { IUserEngineRepository } from "../IUserEngineRepository";
import { injectable } from 'tsyringe'
import { User } from "../../model/User";


@injectable()
export class UserEngineRepositoryImpl implements IUserEngineRepository {
     
      async findUserByEmail(userEmail: string): Promise<User> {
            const userRepository = myDataSource.getRepository(User)
            return await  userRepository.createQueryBuilder('user')
                  .where('user.userEmail = :userEmail', { userEmail: userEmail }).getOne()
      }
      public async saveUser(user: User): Promise<User> {
            const userRepository = myDataSource.getRepository(User)
            return await userRepository.save(user)
      }
}
