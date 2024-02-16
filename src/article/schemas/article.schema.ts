// article.model.ts
import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export class News extends Document {
  uuid: string;
  ord_in_thread: number;
  author: string;
  published: Date;
  title: string;
  text: string;
  language: string;
  crawled: Date;
  site_url: string;
  country: string;
  domain_rank: number;
  thread_title: string;
  spam_score: number;
  main_img_url: string;
  replies_count: number;
  participants_count: number;
  likes: number;
  comments: number;
  shares: number;
  type: string;
}
export const newsSchema = SchemaFactory.createForClass(News);





