import { IsString, IsArray, ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class RoleParams {
  @IsNotEmpty({ message: 'O nome da role é obrigatório.' })
  @IsString({ message: 'O nome da role deve ser uma string.' })
  private name: string;

  @IsArray({ message: 'As permissões devem ser fornecidas como uma matriz.' })
  @ArrayNotEmpty({ message: 'Pelo menos uma permissão deve ser fornecida.' })
  private permissions: string[];

  @IsString({ message: 'A descrição da role deve ser uma string.' })
  private description: string;

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
}