/* eslint-disable prettier/prettier */


import { Injectable, NotFoundException,  UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/user.update.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}


  // Get All Users
  

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

// Get User By ID

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Update User 

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

//delete User 

  async deleteUser(userId: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


  // Signup / User Creation

  async signUp(SignUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password , role } = SignUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role
    });
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }




  // User Login

  async login(LogInDto: LoginDto): Promise<{user:User, token: string }> {
    const { email, password } = LogInDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email ');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token, user };
  }
}
