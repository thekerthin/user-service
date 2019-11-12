import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {

  @ApiModelProperty()
  @IsString()
  nickname: string;

  @ApiModelProperty()
  @IsString()
  password: string;

}
