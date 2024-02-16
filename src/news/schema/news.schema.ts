import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Common } from './common'; 

@Schema()
export class News extends Document {
  @Prop()
  ord_in_thread: number;

  @Prop()
  author: string;

  @Prop()
  published: Date;

  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  thread_title: string;

  @Prop()
  replies_count: number;

  @Prop()
  participants_count: number;

  @Prop()
  likes: number;

  @Prop()
  comments: number;

  @Prop()
  shares: number;

  @Prop()
  type: string;

  @Prop({ type: String }) 
  site_url: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Common' }) 
  common: Common;

  @Prop({ type: SchemaTypes.ObjectId }) 
  data: Types.ObjectId;

  @Prop()
  main_img_url: string; 
}

export const NewsSchema = SchemaFactory.createForClass(News);
