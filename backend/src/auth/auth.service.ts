import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterAuthDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.userService.createUser({
      email: registerDto.email,
      password: hashedPassword,
      userName: registerDto.userName,
    });
    return user;
  }

  async login(loginDto: LoginAuthDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const payload = {
      username: user.userName,
      email: user.email,
      roles: Array.isArray(user.rol) ? user.rol : [user.rol],
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'supersecret',
        expiresIn: '10m',
      }),
    };
  }
}
