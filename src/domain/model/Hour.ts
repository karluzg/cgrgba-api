
import { Entity, PrimaryColumn } from "typeorm";

@Entity({ schema: "portalConsular" })
export class Hour {
    @PrimaryColumn({ unique: true, nullable: false })
    code: string


}