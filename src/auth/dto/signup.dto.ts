import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ description: 'Name', example: 'user name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Email', example: 'abc@example.com' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  readonly email: string;

  @ApiProperty({ description: 'Password', example: '<PASSWORD>' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}
