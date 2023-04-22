import { container } from 'tsyringe';
import { IUserEngine } from '../engine-interface/IUserEngine';
import { UserEngineImpl } from '../engine-interface-impl/impl/UserEngineImpl';


container.register<IUserEngine>('IUserEngine', { useClass: UserEngineImpl });

export default container;