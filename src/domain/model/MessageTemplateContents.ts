import { IsNumber, IsString } from "class-validator";
import { Column, Entity, ManyToOne,  PrimaryGeneratedColumn, Unique } from "typeorm";
import { MessageTemplate } from "./MessageTemplate";
import { Language } from "./LanguageTranslation";

@Entity({ schema: 'portal_consular_dev' })
@Unique(['languageCode', 'messageTemplate'])
export class MessageTemplateContents {

    @IsNumber()
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @ManyToOne(() => Language, { nullable: false })
    languageCode: Language;


    @ManyToOne(() => MessageTemplate, { nullable: false })
    messageTemplate: MessageTemplate;

    @Column({ nullable: false, type: "text" })
    @IsString()
     content: string;


    @Column()
     isHtml: boolean;

}