import { Controller, Body, Patch, HttpStatus, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import SecurityService from '../services/security.service';
import { ApiResponseCustom } from '../utils/decorators/response.decorator';
import { SignInDto, ResponseSignInDto } from '../dtos/sign-in.dto';
import { UpdatePasswordDto } from '../dtos/update-password.dto';

@ApiUseTags('security')
@Controller('security')
export default class SecurityController {

  constructor(
    private readonly service: SecurityService
  ) { }

  @Get('/sign-in')
  @ApiResponseCustom({ status: HttpStatus.OK, type: ResponseSignInDto })
  singIn(@Body() security: SignInDto) {
    return this.service.signIn(security);
  }

  // TODO: improve security
  @Patch('/update-password')
  @ApiResponseCustom({ status: HttpStatus.OK, type: class Empty { } })
  updatePassword(@Body() security: UpdatePasswordDto) {
    return this.service.updatePassword(security);
  }

}
