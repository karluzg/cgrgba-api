import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { FeedbackMessageType } from "./MessageType"
import { FeedbackStatus } from "./FeedbackStatus"
import { IsDate, IsNumber, IsObject, IsString, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { EnumOperationTemplate } from "../../infrestructure/template/EnumOperationTemplate"
import { FeedbackStatusEnum } from "./enum/FeedbackStatusEnum"
import { User } from "./User"


@Entity({ schema: 'portal_consular_dev' })
export class Feedback {

 
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number
    
    @Column()
    citizenName: string

    @Column()
    citizenEmail: string

    @Column()
    messageContent: string

    @IsObject()
    @ValidateNested()
    @Type(() => FeedbackMessageType)
    @ManyToOne(() => FeedbackMessageType,(type) => type.code, { eager: true, nullable: false })
    type: FeedbackMessageType

    @IsObject()
    @ValidateNested()
    @Type(() => FeedbackStatus)
    @ManyToOne(() => FeedbackStatus, (status) => status.code, { eager: true })
    status: FeedbackStatus
    
    @IsNumber()
    @Column({ nullable: false })
    year: number

    @IsNumber()
    @Column({ nullable: false })
    month: number

    @IsNumber()
    @Column({ nullable: false })
    day: number
 
    @IsString()
    @Column({ nullable: false, type: 'timestamp',default: () => "CURRENT_TIMESTAMP"  })
    creationDate: Date

    @IsObject()
    @ValidateNested()
    @Type(() => User)
    @ManyToOne(() => User, (publishedBy) => publishedBy.id, { eager: true })
    publishedBy: User

    @IsObject()
    @ValidateNested()
    @Type(() => User)
    @ManyToOne(() => User, (updateBy) => updateBy.id, { eager: true })
    updateBy: User
  

    @IsDate()
    @Column({ default: null, nullable: true })
    publsihedDate: Date;

 
    @IsDate()
    @Column({ default: null, nullable: true })
    revokingDate: Date

    enumOperationTemplate: EnumOperationTemplate<FeedbackStatusEnum>;


    constructor() {
        this.enumOperationTemplate = new EnumOperationTemplate<FeedbackStatusEnum>(FeedbackStatusEnum);
        this.setStatusEnum(FeedbackStatusEnum.NEW);
    }


    getStatusEnum(): FeedbackStatusEnum {
        return this.enumOperationTemplate.getEnumKey(this.status.code)
    }

    public setStatusEnum(statusEnum: FeedbackStatusEnum | null): void {

        this.status = statusEnum === null ? null : new FeedbackStatus(this.enumOperationTemplate.getKey(statusEnum))
    }
}
