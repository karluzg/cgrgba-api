
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { SchedulingTime } from "./SchedulingTime";

@Entity({ schema: "portalConsular" })
export class Hour {
    @PrimaryColumn({ nullable: false })
    code: string


}