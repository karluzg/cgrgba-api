import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { ParamsTemplate } from '../../../infrestructure/template/ParamsTemplate';
import { AuthParamsTemplate } from '../../../infrestructure/template/AuthParamsTemplate';
import { isNumber } from 'lodash';

export class NewsFileParams extends AuthParamsTemplate {
  

    @IsString()
    @IsNotEmpty()
    filepath: string;

    @IsNumber()
    @IsNotEmpty()
    id: string;

  

    // Outros campos necessários para a criação de uma notícia

    constructor(authenticationToken: string, id:string, filepath:string) {
        super(authenticationToken);
        this.filepath = filepath;
        this.id=id;
    }
}
