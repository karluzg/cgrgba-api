import { container } from 'tsyringe';
import { IUserEngine } from '../../domain/service/IUserEngine';
import { UserEngineImpl } from '../../domain/service/impl/UserEngineImpl';
import { ISchedulingTimeEngine } from '../../domain/service/ISchedulingTimeEngine';
import { SchedulingTimeEngineImpl } from '../../domain/service/impl/SchedulingTimeHourEngineImpl';

import { ITokenEngineRepository } from '../../domain/repository/ITokenEngineRepository';
import { TokenEngineRepositoryImpl } from '../../domain/repository/impl/TokenEngineEngineImpl';
import { IPermissionEngineRepository } from '../../domain/repository/IPermissionEngineRepository';
import { PermissionEngineRepositoryImpl } from '../../domain/repository/impl/PermissionEngineRepositoryImpl';
import { ISessionEngine } from '../../domain/service/ISessionEngine';
import { SessionEngineImpl } from '../../domain/service/impl/SessionEngineImpl';
import { IUserEngineRepository } from '../../domain/repository/IUserEngineRepository';
import { UserEngineRepositoryImpl } from '../../domain/repository/impl/UserEngineReposirotyImpl';
import { IRoleEngineRepository } from '../../domain/repository/IRoleEngineRepository';
import { RoleEngineRepositoryImpl } from '../../domain/repository/impl/RoleEngineReposirotyImpl';
import { IPermissionGroupEngineRepository } from '../../domain/repository/IPermissionGroupEngineRepository';
import { PermissionGroupEngineRepositoryImpl } from '../../domain/repository/impl/PermissionGroupEngineRepositoryImpl';
import { ISchedulingTimeEngineRepository } from '../../domain/repository/ISchedulingTimeEngineRepository';
import { ISchedulingTimeEngineRepositoryImpl } from '../../domain/repository/impl/ISchedulingTimeEngineRepositoryImpl';

//Register container for services
container.register<IUserEngine>('IUserEngine', { useClass: UserEngineImpl });
container.register<ISessionEngine>('ISessionEngine', { useClass: SessionEngineImpl });
container.register<ISchedulingTimeEngine>('ISchedulingTimeEngine', { useClass: SchedulingTimeEngineImpl });



//Register container for repository
container.register<ITokenEngineRepository>('ITokenEngineRepository', { useClass: TokenEngineRepositoryImpl })
container.register<IPermissionEngineRepository>('IPermissionEngineRepository', { useClass: PermissionEngineRepositoryImpl })
container.register<IUserEngineRepository>('IUserEngineRepository', { useClass: UserEngineRepositoryImpl })
container.register<IRoleEngineRepository>('IRoleEngineRepository', { useClass: RoleEngineRepositoryImpl })
container.register<IPermissionGroupEngineRepository>('IPermissionGroupEngineRepository', { useClass: PermissionGroupEngineRepositoryImpl })
container.register<ISchedulingTimeEngineRepository>('ISchedulingTimeEngineRepository', { useClass: ISchedulingTimeEngineRepositoryImpl })
export default container;