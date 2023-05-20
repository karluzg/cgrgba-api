import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { User } from "./User"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDate, IsObject, IsString, ValidateNested } from "class-validator"


@Entity({ schema: 'portal_consular_dev' })
export class TokenSession {
    @IsString()
    @PrimaryColumn("uuid")
    token: string
    
    @IsDate()
    @Column({ nullable: false, type: 'timestamp',default: () => "CURRENT_TIMESTAMP"  })
    creationDate: Date

    @IsDate()
    @Column()
    expireDate: Date

    @ApiProperty({ description: 'The user object', type: () => User })
    @IsObject()
    @ValidateNested()
    @Type(() => User)
    @ManyToOne(()=> User,(user)=> user.id,{eager:true, nullable:false})
    user:User


}
