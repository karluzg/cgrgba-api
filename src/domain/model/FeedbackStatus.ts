import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity({ schema: 'portal_consular_dev' })
export class FeedbackStatus{

    @PrimaryColumn()
    code: string // PRAISE, SUGGESTIONS,CLAIMS, OTHER

    @Column()
    description: string
    
    constructor(code: string) {
        this.code = code;
    }

    getCode(): string {
        return this.code;
    }

   
}
