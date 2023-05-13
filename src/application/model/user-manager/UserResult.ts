
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../../domain/model/User";
import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";
import { SchemaObject } from 'openapi3-ts';
import { IsObject, ValidateNested } from "class-validator"
import { Type } from "class-transformer";


export class UserResult extends ResultTemplate {
   @IsObject()
   @ValidateNested()
   @Type(() => User)
   private user: User

   public get getUser(): User {
      return this.user;
   }
   set setUser(user: User) {
      this.user = user;
   }

}





