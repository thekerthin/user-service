import { EntityRepository, Repository } from 'typeorm';

import { Security } from '../entities/security.entity';

@EntityRepository(Security)
export default class SecurityRepository extends Repository<Security> { }
