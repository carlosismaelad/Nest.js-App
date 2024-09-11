import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers() {
    const users = await this.usersService.findAllUsers();
    return { statusCode: HttpStatus.OK, data: users };
  }

  @Get(':id')
  async findOndeUser(@Param('id') id: string) {
    const user = await this.usersService.findOneUser(id);
    if (!user) {
      return { statusCode: HttpStatus.NOT_FOUND, message: 'User not found!' };
    }
    return { statusCode: HttpStatus.OK, data: user };
  }

  @Post()
  async createUser(@Body() user: UsersDTO) {
    const createdUser = await this.usersService.createUser(user);
    return { statusCode: HttpStatus.OK, data: createdUser };
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userData: UsersDTO) {
    const user = await this.usersService.findOneUser(id);
    if (!user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User does not exist!',
      };
    }
    const updatedUser = await this.usersService.updateUser(id, userData);
    return { statusCode: HttpStatus.OK, data: updatedUser };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.findOneUser(id);
    if (!user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User does not exist!',
      };
    }
    await this.usersService.deleteUser(id);
    return { statusCode: HttpStatus.OK, message: 'User deleted sucessfully!' };
  }
}
