
import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity({ schema: 'portal_consular_dev' })
export class Language {
    @PrimaryColumn()
    @IsString()
    @IsNotEmpty()
    code: string;

    @Column()
    description: string
}