import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { User } from './user.entity';

@Entity('social_media_accounts')
export class SocialMediaAccount {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  url: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(type => User, user => user.socialMediaAccounts)
  user: User;
}
