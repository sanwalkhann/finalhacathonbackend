import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { CommonSchema } from './schema/common';
import { NewsSchema } from './schema/news.schema'; 
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([
      { name: 'Common', schema: CommonSchema },
      { name: 'News', schema: NewsSchema }, 
    ]),
  ],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
