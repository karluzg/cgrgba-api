import { User } from "../../../model/User";
import { UserResponse } from "./UserResponse";

export class UserBuilder {
    public static async buildUserResponse(
        userInput: User
    ): Promise<UserResponse> {


        const newUserResponse = {
            id: userInput.id,
            creationDate: userInput.creationDate,
            activationDate: userInput.activationDate,
            revokingDate: userInput.revokingDate,
            lastPasswordUpdate: userInput.lastPasswordUpdate,
            fullName: userInput.fullName,
            mobileNumber: userInput.mobileNumber,
            email: userInput.email,
            status: userInput.status,
            roles: userInput.roles,
        };

        return newUserResponse

    }
}

