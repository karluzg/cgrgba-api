import { IUserEngineRepository } from "../IUserEngineRepository";
import { injectable } from 'tsyringe'
import { User } from "../../model/User";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { NotFoundException } from "../../../infrestructure/exceptions/NotFoundExcecption";
import { UserStatusEnum } from "../../model/enum/UserStatusEnum";
import { EncryptTemplate } from "../../../infrestructure/template/EncryptTemplate";
import { UserStatus } from "../../model/UserStatus";
import { PageImpl } from "../../../infrestructure/pageable-manager/PageImpl";
import { IPage } from "../../../infrestructure/pageable-manager/IPage";

const myDataSource = require("../../meta-inf/data-source");
const userRepository = myDataSource.getRepository(User)

@injectable()
export class UserEngineRepositoryImpl implements IUserEngineRepository {

      public async findUserByMobileNumber(userMobileNumber: string): Promise<User> {
            return userRepository.createQueryBuilder('user')
                  .leftJoinAndSelect('user.status', 'status')
                  .where('user.mobileNumber = :userMobileNumber', { userMobileNumber: EncryptTemplate.encryptColumn(userMobileNumber) })
                  .getOne();
      }

      public async saveUser(user: User): Promise<User> {
            return await userRepository.save(user);
      }

      async findAllNews(page: number, size: number, status?: UserStatus, orderColumn?: string, direction?: 'ASC' | 'DESC'): Promise<IPage<User>> {
            const skipCount = (page - 1) * size;

            let queryBuilder = userRepository.createQueryBuilder('user')
                  .skip(skipCount)
                  .take(size);

            if (status) {
                  const code = status.code
                  queryBuilder = queryBuilder.leftJoinAndSelect("user.status", "status")
                        .where('status.code = :code', { code });
            }

            if (orderColumn && direction) {
                  queryBuilder = queryBuilder.orderBy(`user.${orderColumn}`, direction);
            }


            const [userList, totalRows] = await queryBuilder.getManyAndCount();
            const totalPages = Math.ceil(totalRows / size);



            return new PageImpl<User>(userList, page, size, totalRows, totalPages)
      }

      public async findUserById(userId: number): Promise<User> {
            return userRepository.createQueryBuilder('user')
                  .leftJoinAndSelect('user.status', 'status')
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
                  .leftJoinAndSelect('user.status', 'status')
                  .where('user.email = :email', { email: EncryptTemplate.encryptColumn(userEmail) })
                  .getOne();

            return user;


      }

      public async updateUserPassword(userId: number, passwordHash: string, passwordSalt: string, status: UserStatusEnum, passwordtry: number): Promise<User> {
            const user = await userRepository.createQueryBuilder('user')
                  .leftJoinAndSelect('user.status', 'status')
                  .where('user.id = :userId', { userId })
                  .getOne();

            if (user) {
                  user.passwordHash = passwordHash;
                  user.passwordSalt = passwordSalt;
                  user.status = status
                  user.passwordTry = passwordtry;
                  return userRepository.save(user);
            }

            throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.USER_NOT_FOUND);
      }



}
