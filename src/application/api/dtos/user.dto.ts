import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { UserDomainEntity } from '@domain/entities/user-domain.entity';
import { SocialMediaAccountDto } from './social-media-account.dto';

export class UserDto extends UserDomainEntity {

  @ApiModelPropertyOptional()
  id: string;

  @ApiModelProperty()
  names: string;

  @ApiModelProperty()
  surnames: string;

  @ApiModelProperty()
  nickname: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  password: string;

  @ApiModelPropertyOptional({ format: 'date' })
  birthday?: string;

  @ApiModelPropertyOptional()
  description?: string;

  @ApiModelPropertyOptional()
  avatar?: string;

  @ApiModelPropertyOptional({ type: [SocialMediaAccountDto] })
  socialMediaAccounts?: SocialMediaAccountDto[];

}
