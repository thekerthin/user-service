import { Injectable } from '@nestjs/common';
import { encrypt, isEmptyOrNil, ElementNotFoundError } from '@kerthin/utils';
import SecurityRepository from '@infrastructure/database/repositories/security.repository';

@Injectable()
export default class SecurityDomainService {

  constructor(
    // TODO: the repositories have to have an interface
    private readonly repository: SecurityRepository
  ) { }

  async createCredentials(nickname: string, password: string): Promise<void> {
    const passwordEncrypted = this.encrypt(password);
    await this.repository.save({ nickname, password: passwordEncrypted });
  }

  async validateCredentials(nickname: string, password: string): Promise<boolean> {
    const passwordEncrypted = this.encrypt(password);

    // TODO: this code must go into repository
    const counter = await this.repository.createQueryBuilder('security')
      .andWhere('security.nickname = :nickname', { nickname })
      .andWhere('security.password = :password', { password: passwordEncrypted })
      .getCount();

    return counter > 0;
  }

  async updatePassword(nickname: string, password: string): Promise<void> {
    const securityRecord = await this.repository.findOne({ nickname });

    if (isEmptyOrNil(securityRecord)) {
      throw new ElementNotFoundError(`The '${nickname}' doesn't exists.`);
    }

    await this.repository.save({ ...securityRecord, password: this.encrypt(password) });
  }

  private encrypt(password: string) {
    const _encrypt = encrypt(process.env.PASSWORD_SECURITY_ENCRYPT);
    const passwordEncrypt = _encrypt(password);

    return passwordEncrypt;
  }

}
