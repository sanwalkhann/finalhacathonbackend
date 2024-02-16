import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  //Sign up
  async signUp(SignUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = SignUpDto;
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  //Login
  async login(LogInDto: LoginDto): Promise<{ user: User; token: string }> {
    const { email, password } = LogInDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { user, token };
  }

  //Getting all users
  async findAll(): Promise<User[]> {
    const user = await this.userModel.find();
    return user;
  }

  //Get a single user
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  //Delete user
  async deleteById(id: String): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async logout(token: string): Promise<void> {
    return;
  }
}
