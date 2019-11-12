import { Controller, HttpStatus, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ApiResponseCustom } from '../utils/decorators/response.decorator';

@ApiUseTags('health')
@Controller('health')
export default class HealthController {

  @Get('/')
  @ApiResponseCustom({ status: HttpStatus.OK, type: class Health { status: string } })
  health() {
    return { status: 'ok' };
  }

}
