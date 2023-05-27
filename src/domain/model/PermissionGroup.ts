import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Permission } from './Permission';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity({ schema: 'portal_consular_dev' })
export class PermissionGroup {
  @PrimaryColumn()
  @IsString()
  @IsNotEmpty()
  code: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  description: string;

  @OneToMany(() => Permission, (permission) => permission.permissionGroup, { cascade: true })
  permissions: Permission[];
}
