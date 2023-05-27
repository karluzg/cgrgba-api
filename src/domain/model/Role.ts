import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { User } from './User';
import { Permission } from './Permission';
import { RoleStatus } from './RoleStatus';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

@Entity({ schema: 'portal_consular_dev' })
export class Role {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  description: string;

  @ManyToMany(() => Permission, { lazy: true })
  @JoinTable()
  permissions: Permission[];

  @ManyToOne(() => User, { eager: true })
  lastUpdateBy: User;

  @ManyToOne(() => User, { eager: true })
  createdBy: User;

  @ManyToOne(() => RoleStatus)
  roleStatus: RoleStatus;

  @Column()
  @IsBoolean()
  isAdmin: boolean;

  @Column({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;
}
