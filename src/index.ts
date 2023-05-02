import { container } from 'tsyringe';
import { IUserEngine } from './domain/service/IUserEngine';
import { UserEngineImpl } from './domain/service/impl/UserEngineImpl';
import { ISchedulingTimeHourEngine } from './domain/service/ISchedulingTimeHourEngine';
import { SchedulingTimeHourEngineImpl } from './domain/service/impl/SchedulingTimeHourEngineImpl';

import { ITokenEngineRepository } from './domain/repository/ITokenEngineRepository';
import { TokenEngineRepositoryImpl } from './domain/repository/impl/TokenRepositoryEngineImpl';
import { IPermissionEngineRepository } from './domain/repository/IPermissionEngineRepository';
import { PermissionEngineRepositoryImpl } from './domain/repository/impl/PermissionEngineRepositoryImpl';
import { IInitialActionEngineRespository } from './domain/repository/IInitialActionEngineRepository';
import { InitialActionEngineRepositoryImpl } from './domain/repository/impl/InitialActionEngineRepositoryImpl';

//Register container for services
container.register<IUserEngine>('IUserEngine', { useClass: UserEngineImpl });
container.register<ISchedulingTimeHourEngine>('ISchedulingTimeHourEngine', { useClass: SchedulingTimeHourEngineImpl });



//Register container for repository
container.register<ITokenEngineRepository>('ITokenEngineRepository', { useClass: TokenEngineRepositoryImpl })
container.register<IPermissionEngineRepository>('IPermissionEngineRepository', { useClass: PermissionEngineRepositoryImpl })
container.register<IInitialActionEngineRespository>('IInitialActionEngineRespository', { useClass: InitialActionEngineRepositoryImpl })


export default container;