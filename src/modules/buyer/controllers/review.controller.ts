/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-19 23:39:26
 * @Description:
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('review')
export class ReviewController {
  // constructor(private readonly reviewService: ReviewService) {}

  // @Post()
  // create(@Body() createReviewDto: CreateReviewDto) {
  //   return this.reviewService.create(createReviewDto);
  // }

  // @Get()
  // findAll() {
  //   return this.reviewService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reviewService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
  //   return this.reviewService.update(+id, updateReviewDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.reviewService.remove(+id);
  }
}
