import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { AuthParamsTemplate } from '../../infrestructure/template/AuthParamsTemplate';
export class GetByEmailOrCodeParams extends AuthParamsTemplate {


    @ApiProperty({ description: 'identificador do campo' })
    @IsNumber()
    value: string;


    constructor(
        authenticationToken: string,
        value: string
    ) {
        super(authenticationToken);
        this.value = value;
    }

    public get getValue(): string {
        return this.value;
    }


}