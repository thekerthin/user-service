import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { SocialMediaAccount } from '@domain/entities/user-domain.entity';

export class SocialMediaAccountDto implements SocialMediaAccount {

  @ApiModelProperty()
  @IsString()
  name: string;

  @ApiModelProperty()
  @IsString()
  url: string;

}
