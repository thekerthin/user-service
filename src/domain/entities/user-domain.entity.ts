export class SocialMediaAccount {
  name: string;
  url: string;
}

export class UserDomainEntity {
  id: string;
  names: string;
  surnames: string;
  nickname: string;
  email: string;
  birthday?: Date | string;
  description?: string;
  avatar?: string;
  socialMediaAccounts?: SocialMediaAccount[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
