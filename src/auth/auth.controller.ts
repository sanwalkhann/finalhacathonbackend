/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "./schemas/user.schema";
import { UpdateUserDto } from "./dto/user.update.dto";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("Registration")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) { }

  // Get all users (only accessible by admin)
  @Get()
  @ApiBearerAuth()
  @ApiSecurity("JWT")
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: "Get all users (admin only)" })
  @ApiResponse({ status: 200, description: "Return all users" })
  async getAllUsers(@Req() req: any) {
    // Access user information from the request object
    const user = req.user;

    // Check if the user has the "admin" role
    if (user && user.role === Role.ADMIN) {
      return this.authService.getAllUsers();
    } else {
      // Handle unauthorized access
      // You can throw an UnauthorizedException or return an appropriate response
      throw new UnauthorizedException("Unauthorized access");
    }
  }

  // Get a user by ID (accessible by admin and the user himself)
  @Get(":id")
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: "Get a user by ID (admin only)" })
  @ApiResponse({ status: 200, description: "Return the user by ID" })
  async getUserById(@Param("id") userId: string) {
    return this.authService.getUserById(userId);
  }

  // Update a user by ID (accessible by admin and the user himself)
  @Put(":id")
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: "Update a user by ID (admin or user themselves)" })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: "Return the updated user" })
  async updateUser(
    @Param("id") userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any
  ) {
    const requestingUserId = req.user.id;

    // Check if the requesting user is an admin or the owner of the account
    if (req.user.role === Role.ADMIN || requestingUserId === userId) {
      return this.authService.updateUser(userId, updateUserDto);
    } else {
      // Handle unauthorized access
      throw new UnauthorizedException('Unauthorized access');
    }
  }

  // Delete a user by ID (accessible by admin and the user himself)
  @Delete(":id")
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: "Delete a user by ID (admin or user themselves)" })
  @ApiResponse({ status: 200, description: "Return the deleted user" })
  async deleteUser(@Param("id") userId: string, @Req() req: any) {
    const requestingUserId = req.user.id;

    // Check if the requesting user is an admin or the owner of the account
    if (req.user.role === Role.ADMIN || requestingUserId === userId) {
      return this.authService.deleteUser(userId);
    } else {
      // Handle unauthorized access
      throw new UnauthorizedException('Unauthorized access');
    }
  }

  // Signup
  @Post("/signup")
  @ApiOperation({
    summary: "User registration",
    description: "Register a new user",
  })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: 201,
    description: "User registered",
    type: () => ({ token: String }),
  })
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  // Login
  @Post("/login")
  @ApiOperation({
    summary: "User login",
    description: "Authenticate and generate a token for the user",
  })
  @ApiResponse({
    status: 200,
    description: "User authenticated",
    type: () => ({ token: String }),
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async login(@Body() Logindto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(Logindto);
  }
}
