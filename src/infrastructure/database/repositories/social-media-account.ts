import { EntityRepository, Repository } from 'typeorm';

import { SocialMediaAccount } from '../entities/social-media-account.entity';

@EntityRepository(SocialMediaAccount)
export default class SocialMediaAccountRepository extends Repository<SocialMediaAccount> { }
