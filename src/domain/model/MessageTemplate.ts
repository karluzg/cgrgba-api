import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { TemplateUsageType } from "./TemplateUsageType";
import { IsNotEmpty, IsString } from "class-validator";


@Entity({ schema: 'portal_consular_dev' })
export class MessageTemplate {

    @PrimaryColumn()
    @IsString()
    @IsNotEmpty()
    code: string;

    @ManyToOne(() => TemplateUsageType)
    usageType: TemplateUsageType;
}