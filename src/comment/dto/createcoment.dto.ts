import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'The content of the comment' })
  content: string;

  @ApiProperty({ description: 'The ID of the article the comment belongs to' })
  articleId: string;
}
