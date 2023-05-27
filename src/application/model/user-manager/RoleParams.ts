import { IsString, IsArray, ArrayNotEmpty, IsNotEmpty, IsBoolean } from 'class-validator';
import { AuthParamsTemplate } from '../../../infrestructure/template/AuthParamsTemplate';

export class RoleParams extends AuthParamsTemplate {
  @IsNotEmpty({ message: 'O nome da role é obrigatório.' })
  @IsString({ message: 'O nome da role deve ser uma string.' })
  private name: string;

  @IsArray({ message: 'As permissões devem ser fornecidas como uma matriz.' })
  @ArrayNotEmpty({ message: 'Pelo menos uma permissão deve ser fornecida.' })
  private permissions?: string[];

  @IsString({ message: 'A descrição da role deve ser uma string.' })
  private description: string;

  @IsBoolean()
  private isAdmin:boolean


  constructor( authenticationToken: string,name: string, description: string,  isAdmin:boolean,permissions?: string[]) {
    super(authenticationToken);
    this.name = name;
    this.permissions = permissions;
    this.description = description;
    this.isAdmin=isAdmin;
  }


  public get getName(): string {
    return this.name;
  }

  public set setName(name: string) {
    this.name = name;
  }

  public get getPermissions(): string[] {
    return this.permissions;
  }

  public set setPermissions(permissions: string[]) {
    this.permissions = permissions;
  }

  public get getDescription(): string {
    return this.description;
  }

  public set setDescription(description: string) {
    this.description = description;
  }

  public get getIsAdmin(): boolean {
    return this.isAdmin;
  }

  public set setIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }
}