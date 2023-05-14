import { IUserEngineRepository } from "../IUserEngineRepository";
import { injectable } from 'tsyringe'
import { User } from "../../model/User";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { NotFoundExcecption } from "../../../infrestructure/exceptions/NotFoundExcecption";

const myDataSource = require("../../meta-inf/data-source");
const userRepository = myDataSource.getRepository(User)

@injectable()
export class UserEngineRepositoryImpl implements IUserEngineRepository {

      async findUserByMobileNumber(userMobileNumber: string): Promise<User> {
            const user = await userRepository
              .createQueryBuilder('user')
              .where('user.mobileNumber = :userMobileNumber', { userMobileNumber })
              .getOne();
          
            if (!user) {
                  throw new NotFoundExcecption(Field.SYSTEM, MiddlewareBusinessMessage.USER_NOT_FOUND)
            }
          
            return user;
          }
          
          async findUserByEmail(userEmail: string): Promise<User> {
            const user = await userRepository
              .createQueryBuilder('user')
              .where('user.email = :userEmail', { userEmail })
              .getOne();
          
            if (!user) {
                  throw new NotFoundExcecption(Field.SYSTEM, MiddlewareBusinessMessage.USER_NOT_FOUND)
            }
          
            return user;
          }
          

      public async saveUser(user: User): Promise<User> {
            return userRepository.save(user)
      }

      public async findAllUsers(page: number, size: number, status?: string): Promise<User[]> {
            const skipCount = (page - 1) * size;

            const query = userRepository
                  .createQueryBuilder("user")
                  .skip(skipCount)
                  .take(size);

            if (status) {
                  query.where("user.status = :status", { status });
            }
            return query.getMany();
      }

      public async findUserById(userId: number): Promise<User> {
            return userRepository.findOne(userId);
      }

      public async updateUser(id: number, updateUserData: User): Promise<User> {
            const user = await userRepository.findOne(id);

            if (!user) {
                  throw new NotFoundExcecption(Field.SYSTEM, MiddlewareBusinessMessage.USER_NOT_FOUND)
            }


            // Add more properties as needed
            const updateUser = Object.assign(user, updateUserData);
            const updatedUser = await userRepository.save(updateUser);
            return updatedUser;
      }


      public async getUserByEmail(userEmail: string): Promise<User> {
            const user = await userRepository.findOne({ email: userEmail });

            if (!user) {
                  throw new NotFoundExcecption(Field.SYSTEM, MiddlewareBusinessMessage.USER_NOT_FOUND)
            }

            return user;
      }


      public async updateUserPassword(userId: number, newPassword: string): Promise<User> {

            const user = await userRepository.findOne(userId);
            if (user) {
                  user.password = newPassword;
                  return userRepository.save(user);
            }
            throw new NotFoundExcecption(Field.SYSTEM, MiddlewareBusinessMessage.USER_NOT_FOUND)
      }

}
