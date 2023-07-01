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
import { UserEngineRepositoryImpl } from '../../domain/repository/impl/UserEngineRepositoryImpl';
import { IRoleEngineRepository } from '../../domain/repository/IRoleEngineRepository';
import { RoleEngineRepositoryImpl } from '../../domain/repository/impl/RoleEngineRepositoryImpl';
import { IPermissionGroupEngineRepository } from '../../domain/repository/IPermissionGroupEngineRepository';
import { PermissionGroupEngineRepositoryImpl } from '../../domain/repository/impl/PermissionGroupEngineRepositoryImpl';
import { ISchedulingTimeEngineRepository } from '../../domain/repository/ISchedulingTimeEngineRepository';
import { SchedulingTimeEngineRepositoryImpl } from '../../domain/repository/impl/SchedulingTimeEngineRepositoryImpl';
import { IHollydayEngineRepository as IHollydayEngineRepository } from '../../domain/repository/IHollydayEngineRepository';
import { HollydayEngineRepositoryImpl as HollydayEngineRepositoryImpl } from '../../domain/repository/impl/HollydayEngineRepositoryImpl';
import { SchedulingHistoryEngineRepositoryImpl } from '../../domain/repository/impl/SchedulingHistoryEngineRespositoryImpl';
import { ISchedulingHistoryEngineRepository as ISchedulingHistoryEngineRepository } from '../../domain/repository/ISchedulingHistoryEngineRespository';
import { ISchedulingEngine } from '../../domain/service/ISchedulingEngine';
import { SchedulingEngineImpl } from '../../domain/service/impl/SchedulingEngineImpl';
import { ISchedulingEngineRepository } from '../../domain/repository/ISchedulingEngineRepository';
import { ICitizenEngineRepository } from '../../domain/repository/ICitizenEngineRepository';
import { CitizenEngineRepositoryImpl } from '../../domain/repository/impl/CitizenEngineRepositoryImpl';
import { SchedulingEngineRepositoryImpl } from '../../domain/repository/impl/SchedulingEngineRepositoryImpl';
import { INewsEngine } from '../../domain/service/INewsEngine';
import { NewsEngineImpl } from '../../domain/service/impl/NewsEngineImpl';
import { INewsCategoryEngineRepository } from '../../domain/repository/INewsCategoryEngineRepository';
import { NewsCategoryEngineRepositoryImpl } from '../../domain/repository/impl/NewsCategoryEngineRepositoryImpl ';
import { NewsEngineRepositoryImpl } from '../../domain/repository/impl/NewsEngineRepositoryImpl';
import { INewsEngineRepository } from '../../domain/repository/INewsEngineRepository';
import { ISchedulingCategoryEngineRepository } from '../../domain/repository/ISchedulingCategoryEngineRepository';
import { SchedulingCategoryEngineRepositoryImpl } from '../../domain/repository/impl/SchedulingCategoryEngineRepositoryImpl';
import { ILovsEngine } from '../../domain/service/ILovsEngine';
import { LovsEngineImpl } from '../../domain/service/impl/LovsEngineImpl';
import { IUserStatusEngineRepository } from '../../domain/repository/IUserStatusEngineRepository';
import { UserStatusEngineRepositoryImpl } from '../../domain/repository/impl/UserStatusEngineRepositoryImpl';
import { IServiceEngineRepository } from '../../domain/repository/IServiceEngineRepository';
import { ServiceEngineRepositoryImpl } from '../../domain/repository/impl/ServiceEngineRepositoryImpl';
import { IRoleEngine } from '../../domain/service/IRoleEngine';
import { RoleEngineImpl } from '../../domain/service/impl/RoleEngineImpl';
import { IPermissionEngine } from '../../domain/service/IPermissionEngine';
import { PermissionEngineImpl } from '../../domain/service/impl/PermissionEngineImpl';
import { ISchedulingPossibleStatusEngineRepository } from '../../domain/repository/ISchedulingPossibleStatusEngineRepository';
import { SchedulingPossibleStatusEngineRepositoryImpl } from '../../domain/repository/impl/SchedulingPossibleStatusEngineRepositoryImpl';
import { IUserPossibleStatusEngneRepository } from '../../domain/repository/IUserPossibleStatusEngineRepository';
import { UserPossibleStatusEngineRepositoryImpl } from '../../domain/repository/impl/UserPossibleStatusEngineRepositoryImpl';
import { ISchedulinStatusEngineRepository } from '../../domain/repository/ISchedulinStatusEngineRepository';
import { SchedulinStatusEngineRepositoryImpl } from '../../domain/repository/impl/SchedulinStatusEngineRepositoryImpl';
import { RoleStatusEngineRepositoryImpl } from '../../domain/repository/impl/RoleStatusEngineRepositoryImpl';
import { IRoleStatusEngineRepository } from '../../domain/repository/IRoleStatusEngineRepository';
import { IMessageContentsEngineRepository } from '../../domain/repository/IMessageContentsEngineRepository';
import { MessageContentsEngineRepositoryImpl } from '../../domain/repository/impl/MessageContentsEngineRepositoryImpl';
import { FeedbackEngineRepositoryImpl } from '../../domain/repository/impl/FeedbackEngineRepositoryImpl';
import { IFeedbackEngineRepository } from '../../domain/repository/IFeedbackEngineRepository';
import { IFeedbackPossibleStatusEngineRepository } from '../../domain/repository/IFeedbackPossibleStatusEngineRepository';
import { FeedbackPossibleStatusEngineRepositoryImpl } from '../../domain/repository/impl/FeedbackPossibleStatusEngineRepositoryImpl';
import { IFeedbackEngine } from '../../domain/service/IFeedbackEngine';
import { FeedbackEngineImpl } from '../../domain/service/impl/FeedbackEngineImpl';
import { IFeedbackMessageTypeEngineRepository } from '../../domain/repository/IFeedbackMessageTypeEngineRepository';
import { FeedbackMessageTypeEngineRepositoryImpl } from '../../domain/repository/impl/FeedbackMessageTypeEngineRepositoryImpl';
import { FeedbackStatusEngineRepositoryImpl } from '../../domain/repository/impl/FeedbackStatusEngineRepositoryImpl';
import { IFeedbackStatusEngineRepository } from '../../domain/repository/IFeedbackStatusEngineRepository';


//Register container for services
container.register<IUserEngine>('IUserEngine', { useClass: UserEngineImpl });
container.register<ISessionEngine>('ISessionEngine', { useClass: SessionEngineImpl });
container.register<IRoleEngine>('IRoleEngine', { useClass: RoleEngineImpl });
container.register<IPermissionEngine>('IPermissionEngine', { useClass: PermissionEngineImpl });
container.register<ISchedulingTimeEngine>('ISchedulingTimeEngine', { useClass: SchedulingTimeEngineImpl });
container.register<ISchedulingEngine>('ISchedulingEngine', { useClass: SchedulingEngineImpl })
container.register<INewsEngine>('INewsEngine', { useClass: NewsEngineImpl });
container.register<ILovsEngine>('ILovsEngine', { useClass: LovsEngineImpl });
container.register<IFeedbackEngine>('IFeedbackEngine', { useClass: FeedbackEngineImpl });




//Register container for repository
container.register<ITokenEngineRepository>('ITokenEngineRepository', { useClass: TokenEngineRepositoryImpl })
container.register<IPermissionEngineRepository>('IPermissionEngineRepository', { useClass: PermissionEngineRepositoryImpl })
container.register<IUserEngineRepository>('IUserEngineRepository', { useClass: UserEngineRepositoryImpl })
container.register<IRoleEngineRepository>('IRoleEngineRepository', { useClass: RoleEngineRepositoryImpl })
container.register<IPermissionGroupEngineRepository>('IPermissionGroupEngineRepository', { useClass: PermissionGroupEngineRepositoryImpl })
container.register<ISchedulingTimeEngineRepository>('ISchedulingTimeEngineRepository', { useClass: SchedulingTimeEngineRepositoryImpl })
container.register<IHollydayEngineRepository>('IHollydayEngineRepository', { useClass: HollydayEngineRepositoryImpl })
container.register<ISchedulingHistoryEngineRepository>('ISchedulingHistoryEngineRepository', { useClass: SchedulingHistoryEngineRepositoryImpl })
container.register<ISchedulingEngineRepository>('ISchedulingEngineRepository', { useClass: SchedulingEngineRepositoryImpl })
container.register<ICitizenEngineRepository>('ICitizenEngineRepository', { useClass: CitizenEngineRepositoryImpl })
container.register<INewsEngineRepository>('INewsEngineRepository', { useClass: NewsEngineRepositoryImpl })
container.register<INewsCategoryEngineRepository>('INewsCategoryEngineRepository', { useClass: NewsCategoryEngineRepositoryImpl })
container.register<ISchedulingCategoryEngineRepository>('ISchedulingCategoryEngineRepository', { useClass: SchedulingCategoryEngineRepositoryImpl })
container.register<IUserStatusEngineRepository>('IUserStatusEngineRepository', { useClass: UserStatusEngineRepositoryImpl })
container.register<IServiceEngineRepository>('IServiceEngineRepository', { useClass: ServiceEngineRepositoryImpl })
container.register<ISchedulingPossibleStatusEngineRepository>('ISchedulingPossibleStatusEngineRepository', { useClass: SchedulingPossibleStatusEngineRepositoryImpl })
container.register<IUserPossibleStatusEngneRepository>('IUserPossibleStatusEngneRepository', { useClass: UserPossibleStatusEngineRepositoryImpl })
container.register<ISchedulinStatusEngineRepository>('ISchedulinStatusEngineRepository', { useClass: SchedulinStatusEngineRepositoryImpl })
container.register<IRoleStatusEngineRepository>('IRoleStatusEngineRepository', { useClass: RoleStatusEngineRepositoryImpl })
container.register<IMessageContentsEngineRepository>('IMessageContentsEngineRepository', { useClass: MessageContentsEngineRepositoryImpl })
container.register<IFeedbackEngineRepository>('IFeedbackEngineRepository', { useClass: FeedbackEngineRepositoryImpl })
container.register<IFeedbackPossibleStatusEngineRepository>('IFeedbackPossibleStatusEngineRepository', { useClass: FeedbackPossibleStatusEngineRepositoryImpl })
container.register<IFeedbackMessageTypeEngineRepository>('IFeedbackMessageTypeEngineRepository', { useClass: FeedbackMessageTypeEngineRepositoryImpl })
container.register<IFeedbackStatusEngineRepository>('IFeedbackStatusEngineRepository', { useClass: FeedbackStatusEngineRepositoryImpl })


export default container;