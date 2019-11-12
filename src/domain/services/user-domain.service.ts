import { Injectable } from '@nestjs/common';
import { EmitEvent, EventBus } from '@kerthin/cqrs';
import { toPaginatedResult, PaginationResult, isNotEmptyOrNil, ValidationError, isEmptyOrNil, ElementNotFoundError } from '@kerthin/utils';
import UserRepository from '@infrastructure/database/repositories/user.repository';
import { UserDomainEntity } from '../entities/user-domain.entity';
import SocialMediaAccountRepository from '@infrastructure/database/repositories/social-media-account.repository';

@Injectable()
export default class UserDomainService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly socialMediaRepository: SocialMediaAccountRepository,
    private readonly eventBus: EventBus
  ) { }

  @EmitEvent({ context: 'user', action: 'userCreated' })
  async create(data: UserDomainEntity): Promise<UserDomainEntity> {
    const isUserRegister = await this.userRepository.findOneOr({ nickname: data.nickname, email: data.email });

    if (isNotEmptyOrNil(isUserRegister)) {
      throw new ValidationError('The nickname or email that you try to register already exists');
    }

    if (isNotEmptyOrNil(data.socialMediaAccounts)) {
      data.socialMediaAccounts = await this.socialMediaRepository.save(data.socialMediaAccounts, { chunk: 50 });
    }

    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }

  @EmitEvent({ context: 'user', action: 'userUpdated' })
  async update(data: UserDomainEntity): Promise<UserDomainEntity> {
    const user = await this.findOneById(data.id);
    if (isEmptyOrNil(user)) {
      throw new ElementNotFoundError(`The user with id '${data.id}' doesn't exists.`);
    }

    const isUserRegister = await this.userRepository.findOneOr({ nickname: data.nickname, email: data.email });
    if (isNotEmptyOrNil(isUserRegister)) {
      throw new ValidationError('The nickname or email that you try to register already exists');
    }

    if (isNotEmptyOrNil(data.socialMediaAccounts)) {
      data.socialMediaAccounts = await this.socialMediaRepository.save(data.socialMediaAccounts, { chunk: 50 });
    }

    return this.userRepository.save({ ...user, ...data });
  }

  findAll(options): Promise<PaginationResult<UserDomainEntity>> {
    return this.userRepository.findAndCount({ relations: ['socialMediaAccounts'] })
      .then(toPaginatedResult(options));
  }

  findOneById(id: string): Promise<UserDomainEntity> {
    return this.userRepository.findOne({ id }, { relations: ['socialMediaAccounts'] });
  }

}
