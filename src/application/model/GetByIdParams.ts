import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { AuthParamsTemplate } from '../../infrestructure/template/AuthParamsTemplate';
export class GetByIdParams extends AuthParamsTemplate {


    @ApiProperty({ description: 'identificador do campo' })
    @IsNumber()
    id: number;


    constructor(
        authenticationToken: string,
        id: number
    ) {
        super(authenticationToken);
        this.id = id;
    }

    public get getId(): number {
        return this.id;
    }


}