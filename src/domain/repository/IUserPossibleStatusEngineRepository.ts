import { UserPossibleStatus } from "../model/UserPossibleStatus";
import { UserStatus } from "../model/UserStatus";

export interface IUserPossibleStatusEngneRepository {
    findUserNextStatus(userCurrentStatus: string): Promise<UserPossibleStatus[]>
}