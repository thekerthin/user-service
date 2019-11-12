import { IsString, IsUUID, IsEmail, IsDateString, ValidateNested, IsOptional } from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { UserDomainEntity } from '@domain/entities/user-domain.entity';
import { SocialMediaAccountDto } from './social-media-account.dto';

export class CreateUserDto extends UserDomainEntity {

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  id: string;

  @ApiModelProperty()
  @IsString()
  names: string;

  @ApiModelProperty()
  @IsString()
  surnames: string;

  @ApiModelProperty()
  @IsString()
  nickname: string;

  @ApiModelProperty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @IsString()
  password: string;

  @ApiModelPropertyOptional({ format: 'date', example: '1995-03-03T00:00:00' })
  @IsOptional()
  @IsDateString()
  birthday?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiModelPropertyOptional({ type: [SocialMediaAccountDto] })
  @ValidateNested()
  socialMediaAccounts?: SocialMediaAccountDto[];

}
