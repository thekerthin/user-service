import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SignInDto {

  @ApiModelProperty()
  @IsString()
  nickname: string;

  @ApiModelProperty()
  @IsString()
  password: string;

}

export class ResponseSignInDto {

  @ApiModelProperty()
  exists: boolean;

}
