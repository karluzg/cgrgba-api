import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../../../domain/model/User';
import { ResultTemplate } from '../../../infrestructure/template/ResultTemplate';
import { UserResponse } from '../../../domain/operation/response-builder/user-manager/UserResponse';
import { UserPossibleStatus } from '../../../domain/model/UserPossibleStatus';


export class UserResult extends ResultTemplate {
  private user: UserResponse
  private nextPossibleStatus: UserPossibleStatus[]


  constructor() {
    super();
    this.getSuccessfullyMessage();
  }

  public get getUser(): UserResponse {
    return this.user;
  }
  public set setUser(user: UserResponse) {
    this.user = user;
  }

  public get getPossibleStatus(): UserPossibleStatus[] {
    return this.nextPossibleStatus;
  }
  public set setPossibleStatus(possibleStatus: UserPossibleStatus[]) {
    this.nextPossibleStatus = possibleStatus;
  }

}

