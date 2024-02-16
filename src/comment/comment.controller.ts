import {
  Body,
  Controller,
  Post,
  Req,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from './dto/createcoment.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // Create a new comment
  @Post(':articleId')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Create a new comment',
    description: 'Create a new comment for a specific article',
  })
  @ApiBody({ type: CreateCommentDto })
  async createComment(
    @Req() req: any,
    @Body() createCommentDto: CreateCommentDto,
    @Param('articleId') articleId: string,
  ) {
    const userId = req.user.id;
    console.log(userId);
    const commentData = { ...createCommentDto, userId, articleId };
    return this.commentService.create(commentData);
  }

  @Get('article/:articleId')
  @ApiOperation({
    summary: 'Get comments ',
    description: 'Retrieve comments for a specific news by its ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Comments found',
  })
  async getCommentsByArticleId(@Param('articleId') articleId: string) {
    return this.commentService.findCommentsByArticleId(articleId);
  }
}
