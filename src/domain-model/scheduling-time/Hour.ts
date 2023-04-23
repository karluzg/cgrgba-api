import { Entity, Column, PrimaryColumn } from "typeorm"


@Entity()
export class Hour {

    @PrimaryColumn()
    hourCode: string

@Column({nullable:false})
hourDesignation:string

}
