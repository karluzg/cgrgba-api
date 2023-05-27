import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { AuthParamsTemplate } from '../../../infrestructure/template/AuthParamsTemplate';

export class NewsParams extends AuthParamsTemplate {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    categoryCode: string;


    // Outros campos necessários para a criação de uma notícia

    constructor(authenticationToken: string, title: string, message: string, categoryCode: string) {
        super(authenticationToken);
        this.title = title;
        this.message = message;
        this.categoryCode = categoryCode;
    }
}
