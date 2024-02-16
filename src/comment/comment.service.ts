/* eslint-disable prettier/prettier */
// comments/comment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<Comment>,
  ) {}

  async create(commentData: {
    content: string;
    userId: string;
    articleId: string;
  }): Promise<Comment> {
    const { content, userId, articleId } = commentData;
    const comment = await this.commentModel.create({
      content,
      user: userId,
      article: articleId,
    });
    return comment;
  }

  async findCommentsByArticleId(articleId: string): Promise<Comment[]> {
    return this.commentModel
      .find({ article: articleId })
      .populate('user', 'name')
      .exec();
  }
}
