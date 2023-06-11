import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { User } from "./User"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDate, IsNumber, IsObject, IsString, ValidateNested } from "class-validator"


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

    @IsNumber()
    @Column({ nullable: false, type: 'bigint' })
    expireDateInMilliseconds: number


    @ApiProperty({ description: 'The user object', type: () => User })
    @IsObject()
    @ValidateNested()
    @Type(() => User)
    @ManyToOne(()=> User,(user)=> user.id,{eager:true, nullable:false})
    user:User


}
