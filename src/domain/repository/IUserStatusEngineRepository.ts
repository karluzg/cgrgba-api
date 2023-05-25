import { UserStatus } from "../model/UserStatus";

export interface IUserStatusEngineRepository {
    save(userStatus: UserStatus): Promise<void>
    findStatusCode(statusCode: string): Promise<UserStatus>
}