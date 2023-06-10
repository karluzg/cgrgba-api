
import { User } from '../../../domain/model/User';
import { ResultTemplate } from '../../../infrestructure/template/ResultTemplate';
import { UserPossibleStatus } from '../../../domain/model/UserPossibleStatus';


export class UserResult extends ResultTemplate {
  private user: User
  private nextPossibleStatus: UserPossibleStatus[]


  constructor() {
    super();
    this.getSuccessfullyMessage();
  }

  public get getUser(): User {
    return this.user;
  }
  public set setUser(user: User) {
    this.user = user;
  }

  public get getPossibleStatus(): UserPossibleStatus[] {
    return this.nextPossibleStatus;
  }
  public set setPossibleStatus(possibleStatus: UserPossibleStatus[]) {
    this.nextPossibleStatus = possibleStatus;
  }

}

