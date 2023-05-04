import { container } from 'tsyringe';
import { IUserEngine } from '../../domain/service/IUserEngine';
import { UserEngineImpl } from '../../domain/service/impl/UserEngineImpl';
import { ISchedulingTimeHourEngine } from '../../domain/service/ISchedulingTimeHourEngine';
import { SchedulingTimeHourEngineImpl } from '../../domain/service/impl/SchedulingTimeHourEngineImpl';

import { ITokenEngineRepository } from '../../domain/repository/ITokenEngineRepository';
import { TokenEngineRepositoryImpl } from '../../domain/repository/impl/TokenEngineEngineImpl';
import { IPermissionEngineRepository } from '../../domain/repository/IPermissionEngineRepository';
import { PermissionEngineRepositoryImpl } from '../../domain/repository/impl/PermissionEngineRepositoryImpl';
import { ISessionEngine } from '../../domain/service/ISessionEngine';
import { SessionEngineImpl } from '../../domain/service/impl/SessionEngineImpl';
import { IUserEngineRepository } from '../../domain/repository/IUserEngineRepository';
import { UserEngineRepositoryImpl } from '../../domain/repository/impl/UserEngineReposirotyImpl';

//Register container for services
container.register<IUserEngine>('IUserEngine', { useClass: UserEngineImpl });
container.register<ISessionEngine>('ISessionEngine', { useClass: SessionEngineImpl });
container.register<ISchedulingTimeHourEngine>('ISchedulingTimeHourEngine', { useClass: SchedulingTimeHourEngineImpl });



//Register container for repository
container.register<ITokenEngineRepository>('ITokenEngineRepository', { useClass: TokenEngineRepositoryImpl })
container.register<IPermissionEngineRepository>('IPermissionEngineRepository', { useClass: PermissionEngineRepositoryImpl })
container.register<IUserEngineRepository>('IUserEngineRepository', { useClass: UserEngineRepositoryImpl })

export default container;