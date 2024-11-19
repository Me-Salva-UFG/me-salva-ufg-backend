import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/entities/user.entity';
import { UserDto } from '../models/dtos/user.dto';
import { UserMapper } from '../models/mapper/user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUser(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new Error('User not Found');
    return UserMapper.trasnformDto(user);
  }
}
