import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Common } from './schema/common';
import { News } from './schema/news.schema';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel('Common') private readonly commonModel: Model<Common>,
    @InjectModel(News.name) private newsModel: Model<News>,

  ) { }

  async saveCommonDataFromJson(): Promise<void> {
    try {
      const filePath = path.resolve(__dirname, '../../data.json');
      const jsonData: Common[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      for (const data of jsonData) {
        try {
          const existingData = await this.commonModel.findOne({
            'site_url': data.site_url,
          });

          if (!existingData) {
            await this.commonModel.create(data);
            console.log(`Inserted new data for site_url: ${data.site_url}`);
          } else {
            if (existingData.country !== data.country || existingData.language !== data.language) {
              await this.commonModel.create(data);
              console.log(`Inserted new data for site_url: ${data.site_url}`);
            } else {
              console.log(`Data already exists for site_url: ${data.site_url}, country: ${data.country}, language: ${data.language}. Skipping insertion.`);
            }
          }
        } catch (error) {
          console.error('Error processing data:', error);
        }
      }

      console.log('Common data saved to News collection.');
    } catch (error) {
      console.error('Error saving common data:', error);
    }
  }

  async getAllCommonData(): Promise<Common[]> {
    try {
      const commonData = await this.commonModel.find().exec();
      return commonData;
    } catch (error) {
      console.error('Error retrieving common data:', error);
      throw error;
    }
  }



  async saveNewsDataFromJson(): Promise<void> {
    try {
      const filePath = path.resolve(__dirname, '../../data.json');
      const jsonData: News[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      for (const data of jsonData) {
        try {
          const existingNews = await this.newsModel.findOne({ site_url: data.site_url });

          if (!existingNews) {
            const commonData = await this.commonModel.findOne({ site_url: data.site_url });

            if (commonData) {
              data.common = commonData;
              await this.newsModel.create(data);
              console.log(`Inserted new news data for site_url: ${data.site_url}`);
            } else {
              console.log(`No common data found for site_url: ${data.site_url}. Skipping insertion.`);
            }
          } else {
            console.log(`News data already exists for site_url: ${data.site_url}. Skipping insertion.`);
          }
        } catch (error) {
          console.error('Error processing news data:', error);
        }
      }

      console.log('News data saved to News collection.');
    } catch (error) {
      console.error('Error saving news data:', error);
    }
  }



  async getNews(): Promise<News[]> {
    try {
      const news = await this.newsModel.find().exec();
      return news;
    } catch (error) {
      console.error('Error retrieving news data:', error);
      throw error;
    }
  }




  // get both
  async getNewsWithCommon(): Promise<News[]> {
    try {
      const news = await this.newsModel.find().populate('common').exec();
      return news;
    } catch (error) {
      console.error('Error retrieving news data with common data:', error);
      throw error;
    }
  }
  


}
