// common.model.ts
import { Schema, model } from 'mongoose';

export interface Common {
  uuid: string;
  crawled: Date;
  site_url: string;
  spam_score: number;
  country: string;
  language: string;
  domain_rank: number;
}

export const CommonSchema = new Schema({
  uuid: String,
  crawled: Date,
  site_url: { type: String, unique: true },
  spam_score: Number,
  country: String,
  language: String,
  domain_rank: Number,
}, { collection: 'common' }); // Specify collection name as 'common'

export const CommonModel = model<Common>('Common', CommonSchema);
