
import { error } from "console";
import { TokenSession } from "../../model/TokenSession"
//import { myDataSource } from "../web-api/meta-inf/data-source";
const myDataSource = require('../../../domain/meta-inf/data-source');
import { ITokenEngineRepository } from "../ITokenEngineRepository";
import { injectable } from 'tsyringe'
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";


@injectable()
export class TokenEngineRepositoryImpl implements ITokenEngineRepository {
      async saveTokenSession(token: TokenSession): Promise<TokenSession> {
            const tokenRepository = myDataSource.getRepository(TokenSession)

            return await tokenRepository.save(token);
      }


      async findByTokenAndValidSessionExpireDate(tokenInput: string, newDate: Date): Promise<TokenSession> {
                  const tokenRepository = myDataSource.getRepository(TokenSession)

                  return await tokenRepository.createQueryBuilder('tokenSession').leftJoinAndSelect("tokenSession.user","user")
                        .where('tokenSession.token = :token', { token: tokenInput })
                        .andWhere('tokenSession.sessionExpireDate > :newDate', { newDate:newDate }).getOne()
           
      }
}
