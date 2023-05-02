import { Entity, Column, PrimaryColumn } from "typeorm"


@Entity({schema:"portalConsular"})
export class Hour {

    @PrimaryColumn({nullable:false})
    hourCode: string

    @Column({nullable:false})
    hourDesignation:string

}
