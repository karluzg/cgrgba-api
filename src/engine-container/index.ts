import { container } from 'tsyringe';
import { IUserEngine } from '../engine-interface/services/IUserEngine';
import { UserEngineImpl } from '../engine-interface-impl/impl/UserEngineImpl';
import { ITokenEngineRepository } from '../repository/engine/ITokenEngineRepository';
import { TokenEngineRepositoryImpl } from '../repository/TokenRepositoryEngineImpl';
import { IPermissionEngineRepository } from '../repository/engine/IPermissionEngineRepository';
import { PermissionEngineRepositoryImpl } from '../repository/PermissionEngineRepositoryImpl';
import { ISchedulingTimeHourEngine } from '../engine-interface/services/ISchedulingTimeHourEngine';
import { SchedulingTimeHourEngineImpl } from '../engine-interface-impl/impl/SchedulingTimeHourEngineImpl';
import { IInitialActionEngineRespository } from '../repository/engine/IInitialActionEngineRepository';
import { InitialActionEngineRepositoryImpl } from '../repository/InitialActionEngineRepositoryImpl';

//Register container for services
container.register<IUserEngine>('IUserEngine', { useClass: UserEngineImpl });
container.register<ISchedulingTimeHourEngine>('ISchedulingTimeHourEngine', { useClass: SchedulingTimeHourEngineImpl });



//Register container for repository
container.register<ITokenEngineRepository>('ITokenEngineRepository', { useClass: TokenEngineRepositoryImpl })
container.register<IPermissionEngineRepository>('IPermissionEngineRepository', { useClass: PermissionEngineRepositoryImpl })
container.register<IInitialActionEngineRespository>('IInitialActionEngineRespository', { useClass: InitialActionEngineRepositoryImpl })


export default container;