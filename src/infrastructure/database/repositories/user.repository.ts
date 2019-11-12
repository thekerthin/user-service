import { EntityRepository, Repository, FindConditions, ObjectLiteral } from 'typeorm';

import { User } from '../entities/user.entity';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

  findOneOr(options: FindConditions<User>) {
    const queryBuilder = this.createQueryBuilder('user');

    Object.keys(options)
      .forEach(key => queryBuilder.orWhere(`user.${key} = :${key}`, { [key]: options[key] }));

    return queryBuilder.getOne();
  }

}
