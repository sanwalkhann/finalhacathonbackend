import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import { Common } from './schema/common';
import { News } from './schema/news.schema';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('News') // Tags the controller with 'News' for Swagger documentation
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Get('/save-common-data')
  @ApiOperation({ summary: 'Save common data from JSON' })
  @ApiResponse({ status: 200, description: 'Common data saved successfully.' })
  @ApiResponse({ status: 500, description: 'Failed to save common data.' })
  async saveCommonData(): Promise<string> {
    try {
      await this.newsService.saveCommonDataFromJson();
      return 'Common data saved successfully.';
    } catch (error) {
      console.error('Error saving common data:', error);
      return 'Failed to save common data.';
    }
  }

  @Get('/get-all-common-data')
  @ApiOperation({ summary: 'Get all common data' })
  @ApiResponse({ status: 200, description: 'Returns an array of common data', isArray: true })
  @ApiResponse({ status: 500, description: 'Error retrieving common data.' })
  async getAllCommonData(): Promise<Common[]> {
    try {
      const commonData = await this.newsService.getAllCommonData();
      return commonData;
    } catch (error) {
      console.error('Error retrieving common data:', error);
      return [];
    }
  }

  @Get('/save-news-data')
  @ApiOperation({ summary: 'Save news data from JSON' })
  @ApiResponse({ status: 200, description: 'News data saved successfully.' })
  @ApiResponse({ status: 500, description: 'Failed to save news data.' })
  async saveNewsData(): Promise<string> {
    try {
      await this.newsService.saveNewsDataFromJson();
      return 'News data saved successfully.';
    } catch (error) {
      console.error('Error saving news data:', error);
      return 'Failed to save news data.';
    }
  }

  @Get('/get-news-data')
  @ApiOperation({ summary: 'Get all news data' })
  @ApiResponse({ status: 200, description: 'Returns an array of news data', type: News, isArray: true })
  async getNews(): Promise<News[]> {
    return this.newsService.getNews();
  }

  @Get('/get-news-with-common')
  @ApiOperation({ summary: 'Get news with common data' })
  @ApiResponse({ status: 200, description: 'Returns an array of news data with common data', type: News, isArray: true })
  async getNewsWithCommon(): Promise<News[]> {
    return this.newsService.getNewsWithCommon();
  }
}
