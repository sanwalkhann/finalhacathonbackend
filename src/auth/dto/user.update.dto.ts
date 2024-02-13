/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false, description: 'The new name of the user' })
  readonly name?: string;

  @ApiProperty({ required: false, description: 'The new email of the user' })
  readonly email?: string;

}
