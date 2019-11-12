import { Controller, Get, Post, Body, Patch, Param, HttpStatus } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import UserService from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ApiResponseCustom } from '../utils/decorators/response.decorator';
import { ApiPaginationResponseCustom } from '../utils/decorators/pagination-response.decorator';
import { UserDto } from '../dtos/user.dto';

@ApiUseTags('users')
@Controller('users')
export default class UserController {

  constructor(private readonly service: UserService) { }

  @Post()
  @ApiResponseCustom({ status: HttpStatus.CREATED, type: UserDto })
  create(@Body() user: CreateUserDto) {
    return this.service.create(user);
  }

  @Patch(':id')
  @ApiResponseCustom({ status: HttpStatus.OK, type: UserDto })
  update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.service.update(id, user);
  }

  @Get()
  @ApiPaginationResponseCustom({ status: HttpStatus.OK, type: UserDto })
  findAll() {
    return this.service.findAll({});
  }

  @Get(':id')
  @ApiResponseCustom({ status: HttpStatus.OK, type: UserDto })
  findOneById(@Param('id') id) {
    return this.service.findOneById(id);
  }

}
