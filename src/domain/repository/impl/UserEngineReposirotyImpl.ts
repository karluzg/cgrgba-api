import { IUserEngineRepository } from "../IUserEngineRepository";
import { injectable } from 'tsyringe'
import { User } from "../../model/User";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { NotFoundException } from "../../../infrestructure/exceptions/NotFoundExcecption";
import { UserStatusEnum } from "../../model/enum/UserStatusEnum";

const myDataSource = require("../../meta-inf/data-source");
const userRepository = myDataSource.getRepository(User)

@injectable()
export class UserEngineRepositoryImpl implements IUserEngineRepository {

      public async findUserByMobileNumber(userMobileNumber: string): Promise<User> {
            return userRepository.createQueryBuilder('user')
                  .where('user.mobileNumber = :userMobileNumber', { userMobileNumber })
                  .getOne();
      }

      public async saveUser(user: User): Promise<User> {
            return userRepository.save(user);
      }

      public async findAllUsers(page: number, size: number, status?: string): Promise<User[]> {
            const skipCount = (page - 1) * size;

            const query = userRepository.createQueryBuilder('user')
                  .skip(skipCount)
                  .take(size);

            if (status) {
                  query.where('user.status = :status', { status });
            }

            return query.getMany();
      }

      public async findUserById(userId: number): Promise<User> {
            return userRepository.createQueryBuilder('user')
                  .where('user.id = :userId', { userId })
                  .getOne();
      }

      public async updateUser(id: number, updateUserData: User): Promise<User> {
            const user = await userRepository.createQueryBuilder('user')
                  .where('user.id = :id', { id })
                  .getOne();

            if (!user) {
                  throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.USER_NOT_FOUND);
            }

            const updatedUser = Object.assign(user, updateUserData);
            return userRepository.save(updatedUser);
      }

      public async findUserByEmail(userEmail: string): Promise<User> {
            const user = await userRepository.createQueryBuilder('user')
                  .where('user.email = :email', { email: userEmail })
                  .getOne();

            return user;
      }

      public async updateUserPassword(userId: number, passwordHash: string, passwordSalt: string, status:UserStatusEnum,passwordtry:number): Promise<User> {
            const user = await userRepository.createQueryBuilder('user')
                  .where('user.id = :userId', { userId })
                  .getOne();

            if (user) {
                  user.passwordHash = passwordHash;
                  user.passwordSalt = passwordSalt;
                  user.status=status
                  user.passwordTry=passwordtry;
                  return userRepository.save(user);
            }

            throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.USER_NOT_FOUND);
      }



}
