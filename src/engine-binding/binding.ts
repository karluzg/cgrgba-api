import { Container } from 'inversify';
import { IUserEngine } from '../engine-interface/IUserEngine';
import { UserEngineImpl } from '../engine-interface-impl/impl/UserEngineImpl';

const container = new Container();
container.bind<IUserEngine>('IUserEngine').to(UserEngineImpl);

export default container;