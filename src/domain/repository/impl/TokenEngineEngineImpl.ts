
import { error } from "console";
import { TokenSession } from "../../model/TokenSession"
//import { myDataSource } from "../web-api/meta-inf/data-source";
const myDataSource = require('../../../domain/meta-inf/data-source');
import { ITokenEngineRepository } from "../ITokenEngineRepository";
import { injectable } from 'tsyringe'

const tokenRepository = myDataSource.getRepository(TokenSession)

@injectable()
export class TokenEngineRepositoryImpl implements ITokenEngineRepository {

      async saveTokenSession(token: TokenSession): Promise<TokenSession> {
            return await tokenRepository.save(token);
      }

      async findByToken(token: string): Promise<TokenSession> {

            return await tokenRepository.createQueryBuilder('tokenSession')
                  .leftJoinAndSelect("tokenSession.user", "user")
                  .where('tokenSession.token = :token', { token: token })
                  .getOne()
           
      }
}
