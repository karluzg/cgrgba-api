import { container } from 'tsyringe';
import { IUserEngine } from '../engine-interface/services/IUserEngine';
import { UserEngineImpl } from '../engine-interface-impl/impl/UserEngineImpl';
import { ITokenEngineRepository } from '../repository/engine/ITokenEngineRepository';
import { TokenEngineRepositoryImpl } from '../repository/TokenRepositoryEngineImpl';
import { IPermissionEngineRepository } from '../repository/engine/IPermissionEngineRepository';
import { PermissionEngineRepositoryImpl } from '../repository/PermissionEngineRepositoryImpl';

//Register container for services
container.register<IUserEngine>('IUserEngine', { useClass: UserEngineImpl });



//Register container for repository
container.register<ITokenEngineRepository>('ITokenRepositoryEngine', {useClass :TokenEngineRepositoryImpl })
container.register<IPermissionEngineRepository>('IPermissionRepositoryEngine',{useClass:PermissionEngineRepositoryImpl})
 

export default container;