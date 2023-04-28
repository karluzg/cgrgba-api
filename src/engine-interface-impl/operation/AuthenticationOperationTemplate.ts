import { Result } from "../../engine-interface/Result";
import { AuthParams } from "../../engine-interface/AuthParams";
import { OperationTemplate } from "./OperationTemplate";
import { IInitialActionEngineRespository } from "../../repository/engine/IInitialActionEngineRepository";
import { ITokenEngineRepository } from "../../repository/engine/ITokenEngineRepository";
import logger from "../../common/config/logger";
import { UnauthorizedOperationException } from "../../common/exceptions/UnauthorizedOperationException";
import {container} from 'tsyringe'
import { InitialActionTypeEnum } from "../../domain-model/enum/InitialActionType";
import { TokenSession } from "../../domain-model/TokenSession";
import { ForbiddenOperationException } from "../../common/exceptions/ForbiddenOperationException";
import { UnsuccessfulOperationException } from "../../common/exceptions/UnsuccessfulOperationException";

export abstract class AuthenticationOperationTemplate<R extends Result, P extends AuthParams> extends OperationTemplate<R, P>{

    protected initialActionRepository:IInitialActionEngineRespository

    public setInitialActionRepository(initialActionRepository: IInitialActionEngineRespository) {
        this.initialActionRepository = initialActionRepository;
    }

constructor(operationId:number){
    super(operationId)


}

protected  getPermittedTypes(): InitialActionTypeEnum[]{
    return new Array<InitialActionTypeEnum>();
}

protected doExecute(params: P, result: R) {

    const tokenRepository = container.resolve<ITokenEngineRepository>("ITokenRepository")
    const initiaActionEngineRepository = container.resolve<IInitialActionEngineRespository>("IInitialActionEngineRespository")

 
     
    logger.info("[Antes da chamada Async] - Iniciar pesquisa de token de sessão válido")
    
    tokenRepository.findByTokenAndValidSessionExpireDate(params.getAuthenticationToken(), new Date)
    .then((tokenSessionFounded) =>{
     
        if(tokenSessionFounded==null){
            logger.error("Não existe token de sessão válido")
            throw new UnauthorizedOperationException("Operação não permetida")
         }

         logger.info("Token encontrado para o utilizador:"+""+tokenSessionFounded.user.UserEmail)

         const userId=tokenSessionFounded.user.id;

         initiaActionEngineRepository.findByUserAndExecutedDateIsNull(userId).then((initialActions)=> {
           initialActions.filter((initialAction)=>{

      if(!this.getPermittedTypes().includes(initialAction.initialActionType)){
           throw new ForbiddenOperationException("Tem ações iniciais não executadas");
       }

        });

        this.doAuthExecute(tokenSessionFounded, params,result)
        
         }).catch((error)=>{
            logger.error("Ocorreu um erro na pesquisa de ação iniciar do utilizador. operação com id %s", this.operationId);
            logger.error(error)
            throw new UnsuccessfulOperationException("Ocorreu um erro inesperado no servidor. Por favor, tente novamente mais tarde");

         })

    }).catch((error)=>{
        logger.error("Ocorreu um erro na pesquisa de sessão do utilizador. operação com id %s", this.operationId)
        logger.error(error)
        throw new UnsuccessfulOperationException("Ocorreu um erro inesperado no servidor. Por favor, tente novamente mais tarde")
    })  
    
   
}

protected abstract  doAuthExecute(tokenSession:TokenSession, params:P , result:R ): void

}