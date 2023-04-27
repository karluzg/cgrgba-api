
import { TokenSession } from "../domain-model/session/TokenSession";
import { myDataSource } from "../web-api/meta-inf/data-source";
import { ITokenEngineRepository } from "./engine/ITokenEngineRepository";
import {injectable} from 'tsyringe'

const tokenRepository=  myDataSource.getRepository(TokenSession)

@injectable()
export class TokenEngineRepositoryImpl  implements ITokenEngineRepository {
 

    async findByTokenAndValidSessionExpireDate(tokenInput: string, newDate:Date ): Promise<TokenSession | null> {

  return  await  tokenRepository
    .createQueryBuilder('tokenSession')
    .where('tokenSession.token = :token',{token:tokenInput})
    .andWhere('tokenSession.sessionCreationDate > :newDate',{newDate})
    .getOne()
    }
   

}