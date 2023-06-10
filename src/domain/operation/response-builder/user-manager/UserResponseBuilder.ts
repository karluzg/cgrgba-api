import { User } from "../../../model/User";

export class UserResponseBuilder {
    public static async buildUserResponse(user: User): Promise<User> {
        delete user.passwordHash
        delete user.passwordSalt
        delete user.passwordTry
        delete user.enumOperationTemplate

        return user;
    }
}