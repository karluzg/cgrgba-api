import { IsArray, IsObject, ValidateNested } from "class-validator";
import { Hour } from "../../../../domain/model/Hour";
import { ResultTemplate } from "../../../../infrestructure/template/ResultTemplate";
import { Type } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';

export class TimeSlotResult extends ResultTemplate {
  
   @ApiProperty({
      description: 'List of hours',
      type: [Hour],
    })
   @IsObject()
   @ValidateNested()
   @Type(() => Hour)
   private timeList: Hour[];

   public get getTimeList(): Hour[] {
      return this.timeList;
   }
   set setTimeList(timeList: Hour[]) {
      this.timeList = timeList;
   }

}



