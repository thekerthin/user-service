import { EntityRepository, Repository } from 'typeorm';

import { Security } from '../entities/security.entity';

@EntityRepository(Security)
export default class Security1Repository extends Repository<Security> { }
