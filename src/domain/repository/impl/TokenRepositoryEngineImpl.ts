
import { error } from "console";
import { TokenSession } from "../../model/TokenSession"
//import { myDataSource } from "../web-api/meta-inf/data-source";
const myDataSource = require("../../meta-inf/data-source");
import { ITokenEngineRepository } from "../ITokenEngineRepository";
import { injectable } from 'tsyringe'


@injectable()
export class TokenEngineRepositoryImpl implements ITokenEngineRepository {


      findByTokenAndValidSessionExpireDate(tokenInput: string, newDate: Date): TokenSession {


            const tokenRepository = myDataSource.getRepository(TokenSession)

            return tokenRepository.createQueryBuilder('tokenSession')
                  .where('tokenSession.token = :token', { token: tokenInput })
                  .andWhere('tokenSession.sessionCreationDate > :newDate', { newDate }).getOne()



      }
}
