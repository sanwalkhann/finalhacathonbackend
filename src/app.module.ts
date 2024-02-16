/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// import { AuthModule } from './auth/auth.module';
// import { ArticleModule } from './article/article.module';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    // ArticleModule,
    NewsModule,
    AuthModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
