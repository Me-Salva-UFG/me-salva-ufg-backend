import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../models/dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findUser(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findUser(+id);
  }
}
