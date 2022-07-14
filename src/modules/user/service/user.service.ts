import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Users } from '../model/user.model';
import { providersEnum } from '../../../common/constant';
import * as bcrypt from 'bcrypt';
import { createToken } from '../../../common/utils';
import { SignupUserDto } from '../dto/signupUser.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(providersEnum.USER_PROVIDER)
    private readonly userRepository: typeof Users,
  ) {}

  async findOneByEmail(email: string): Promise<Users> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneByUsername(username: string): Promise<Users> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findOneByUserId(userId: number): Promise<Users> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async insert(
    email: string,
    password: string,
    username: string,
    firstName: string,
    middleName: string,
    lastName: string,
    role: string,
  ): Promise<Users> {
    return await this.userRepository.create({
      email,
      password,
      username,
      firstName,
      middleName,
      lastName,
      role,
    });
  }

  async signup(dto: SignupUserDto): Promise<Users> {
    const { email, username, password, firstName, middleName, lastName, role } =
      dto;
    const findEmail = await this.findOneByEmail(email);
    const findUsername = await this.findOneByUsername(username);

    if (findEmail && findUsername) {
      throw new HttpException('Email and Username already exists', 409);
    }

    if (findEmail) {
      throw new HttpException('Email already exists', 409);
    }

    if (findUsername) {
      throw new HttpException('Username already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.insert(
      email,
      hashedPassword,
      username,
      firstName,
      middleName,
      lastName,
      role,
    );
  }

  async login(
    inEmail: string,
    inUsername: string,
    inPassword: string,
  ): Promise<object> {
    if (!inEmail && !inUsername) {
      throw new HttpException('Email or Username is required', 400);
    }

    const user = inEmail
      ? await this.findOneByEmail(inEmail)
      : await this.findOneByUsername(inUsername);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const { email, username, password, firstName, middleName, lastName } = user;
    const checkPassword = await bcrypt.compare(inPassword, password);

    if (!checkPassword) {
      throw new HttpException('Password is incorrect', 403);
    }

    const token = await createToken(user.id);

    return {
      data: {
        email,
        username,
        firstName,
        middleName,
        lastName,
      },
      token,
    };
  }
}
