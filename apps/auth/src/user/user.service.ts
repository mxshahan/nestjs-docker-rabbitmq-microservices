import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './schemas/user.schema';
import { Auth0Respose } from '../auth.interface';
import { CreateUserRequest } from './dto/create-user.request';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async createUser(request: CreateUserRequest) {
    await this.validateCreateUserRequest(request);
    const user = await this.usersRepository.create({
      ...request,
    });
    return user;
  }

  private async validateCreateUserRequest(request: CreateUserRequest) {
    let user: User;
    try {
      user = await this.usersRepository.findOne({
        auth0uid: request.auth0uid,
      });
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException('User already exists.');
    }
  }

  async validateUser(payload: Auth0Respose) {
    const user = await this.usersRepository.findOne({ auth0uid: payload });

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.usersRepository.findOne(getUserArgs);
  }
}
