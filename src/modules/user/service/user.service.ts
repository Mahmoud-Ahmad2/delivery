import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Users } from '../model/user.model';
import { providersEnum } from '../../../common/constant';
import * as bcrypt from 'bcrypt';
import { createToken } from '../../../common/utils';
import { SignupUserDto } from '../dto/signupUser.dto';
import { LoginDto } from '../dto/login.dto';
import { Logger } from '../../../common/logger';
import { ERRORS } from '../../../common/constant';

@Injectable()
export class UserService {
  constructor(
    @Inject(providersEnum.USER_PROVIDER)
    private readonly userRepository: typeof Users,
  ) {}

  private readonly logger = new Logger(UserService.name);
  async findOneByEmail(email: string): Promise<Users> {
    return await this.userRepository
      .scope(['login'])
      .findOne({ where: { email } });
  }

  async findOneByUsername(username: string): Promise<Users> {
    return await this.userRepository
      .scope(['login'])
      .findOne({ where: { username } });
  }

  async findOneByUserId(userId: number): Promise<Users> {
    return await this.userRepository
      .scope(['basic'])
      .findOne({ where: { id: userId } });
  }

  async getAllUsers(): Promise<Users[]> {
    return await this.userRepository.findAll();
  }

  async deleteUser(userId: number): Promise<object> {
    const user = await this.findOneByUserId(userId);
    if (!user) {
      throw new HttpException(ERRORS.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.userRepository.destroy({
      where: { id: userId },
    });

    this.logger.log(`User ${user.username} deleted`);
    return { message: 'User deleted' };
  }

  async signup(dto: SignupUserDto): Promise<Users> {
    const { email, username, password, firstName, middleName, lastName, role } =
      dto;
    const findEmail = await this.findOneByEmail(email);
    const findUsername = await this.findOneByUsername(username);

    if (findEmail && findUsername) {
      throw new HttpException(
        ERRORS.EMAIL_OR_USERNAME_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    if (findEmail) {
      throw new HttpException(ERRORS.EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }

    if (findUsername) {
      throw new HttpException(ERRORS.EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const transaction = await this.userRepository.sequelize.transaction();
    try {
      const user = await this.userRepository.create(
        {
          email,
          password: hashedPassword,
          username,
          firstName,
          middleName,
          lastName,
          role,
        },
        { transaction },
      );
      return user;
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    } finally {
      this.logger.log(`User ${username} created`);
      await transaction.commit();
    }
  }

  async login(dto: LoginDto): Promise<object> {
    const { inEmail, inUsername, inPassword } = dto;

    if (!inEmail && !inUsername) {
      throw new HttpException(
        ERRORS.EMAIL_OR_USERNAME_IS_REQUIRED,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = inEmail
      ? await this.findOneByEmail(inEmail)
      : await this.findOneByUsername(inUsername);

    if (!user) {
      throw new HttpException(ERRORS.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const { email, username, password, firstName, middleName, lastName, role } =
      user;
    const checkPassword = await bcrypt.compare(inPassword, password);

    if (!checkPassword) {
      throw new HttpException(ERRORS.PASSWORD_INCORRECT, HttpStatus.FORBIDDEN);
    }

    const token = await createToken(user.id);

    this.logger.log(`User ${username} logged in`);
    return {
      data: {
        email,
        username,
        firstName,
        middleName,
        lastName,
        role,
      },
      token,
    };
  }
}
