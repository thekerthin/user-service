import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { SocialMediaAccount } from './social-media-account.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  names: string;

  @Column({ length: 100 })
  surnames: string;

  @Column({ length: 50, unique: true })
  nickname: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  birthday: Date;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  avatar?: string;

  @OneToMany(type => SocialMediaAccount, socialMediaAccount => socialMediaAccount.user)
  socialMediaAccounts: SocialMediaAccount[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
