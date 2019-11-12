import { IsString, IsUUID, IsEmail, IsDateString, ValidateNested, IsOptional } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { UserDomainEntity } from '@domain/entities/user-domain.entity';
import { SocialMediaAccountDto } from './social-media-account.dto';

export class UpdateUserDto extends UserDomainEntity {

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  names: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  surnames: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  nickname: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiModelPropertyOptional({ format: 'date' })
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
  @IsOptional()
  @ValidateNested()
  socialMediaAccounts?: SocialMediaAccountDto[];

}
