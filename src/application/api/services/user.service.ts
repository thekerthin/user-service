import { Injectable } from '@nestjs/common';
import { omit } from 'ramda';
import * as uuid from 'uuid/v4';
import { applyPaginationDefaults, wrapPaginatedResponse, PaginationResponse, wrapResponse } from '@kerthin/utils';
import UserDomainService from '@domain/services/user-domain.service';
import { UserDomainEntity } from '@domain/entities/user-domain.entity';
import SecurityDomainService from '@domain/services/security-domain.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { catchGeneralErrors, notFound } from '../utils/catch-errors';

@Injectable()
export default class UserService {

  constructor(
    private readonly userDomain: UserDomainService,
    private readonly securityDomain: SecurityDomainService
  ) { }

  async create(user: CreateUserDto) {
    const userCreated = await this.userDomain.create(<UserDomainEntity>omit('password', {
      id: uuid(),
      ...user,
    }))
      .catch(catchGeneralErrors);

    await this.securityDomain.createCredentials(user.nickname, user.password);

    return wrapResponse(userCreated);
  }

  update(id: string, user: UpdateUserDto) {
    return this.userDomain.update(<UserDomainEntity>{ id, ...user })
      .then(wrapResponse)
      .catch(catchGeneralErrors);
  }

  findAll(options = {}): Promise<PaginationResponse<UserDomainEntity>> {
    return this.userDomain.findAll(applyPaginationDefaults(options))
      .then(wrapPaginatedResponse)
  }

  findOneById(id: string) {
    return this.userDomain.findOneById(id)
      .then(notFound(`The user with id '${id}' doesn't exists.`))
      .then(wrapResponse)
  }

}
