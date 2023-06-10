import { User } from "../../../domain/model/User";
import { UserResponse } from "../../../domain/operation/response-builder/user-manager/UserResponse";
import { PageableResult } from "../../../infrestructure/pageable-manager/PageableResult";

export class UserResultList extends PageableResult<UserResponse> {

}
