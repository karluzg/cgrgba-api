import { Role } from "../../../model/Role";
import { User } from "../../../model/User";
import { UserStatus } from "../../../model/UserStatus";

export class UserResponse {
    id: number;
    creationDate: Date;
    activationDate: Date;
    revokingDate: Date;
    lastPasswordUpdate: Date;
    fullName: string;
    mobileNumber: string;
    email: string;
    status: UserStatus;
    roles: Role[];

    constructor(user: User) {
        this.id = user.id;
        this.creationDate = user.creationDate;
        this.activationDate = user.activationDate;
        this.revokingDate = user.revokingDate;
        this.lastPasswordUpdate = user.lastPasswordUpdate;
        this.fullName = user.fullName;
        this.mobileNumber = user.mobileNumber;
        this.email = user.email;
        this.status = user.status;
        this.roles = user.roles;
    }

}