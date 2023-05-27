import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { PermissionGroup } from './PermissionGroup';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity({ schema: 'portal_consular_dev' })
export class Permission {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  code: string;

  @Column({ nullable: false })
  @IsString()
  description: string;

  @ManyToOne(() => PermissionGroup, permissionGroup => permissionGroup.permissions, { nullable: false })
  permissionGroup: PermissionGroup;
}
