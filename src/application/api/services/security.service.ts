import { Injectable } from '@nestjs/common';
import { wrapResponse } from '@kerthin/utils';
import { compose, objOf } from 'ramda';
import SecurityDomainService from '@domain/services/security-domain.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { UpdatePasswordDto } from '../dtos/update-password.dto';
import { catchGeneralErrors } from '../utils/catch-errors';

@Injectable()
export default class SecurityService {

  constructor(private readonly domain: SecurityDomainService) { }

  signIn({ nickname, password }: SignInDto) {
    return this.domain.validateCredentials(nickname, password)
      .then(compose(wrapResponse, objOf('exists')));
  }

  async updatePassword({ nickname, password }: UpdatePasswordDto) {
    return this.domain.updatePassword(nickname, password)
      .then(wrapResponse)
      .catch(catchGeneralErrors);
  }

}
