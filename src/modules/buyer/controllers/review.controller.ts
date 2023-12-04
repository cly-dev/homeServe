/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-19 23:39:26
 * @Description:
 */
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateReviewsDto } from '../../../dto/review.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ReviewService } from '../../../modules/review/review.service';
import { AuthGuard } from '@nestjs/passport';
import { PageSizeDto } from '../../../dto/common.dto';

@ApiTags('用户-评论')
@Controller('/buyer/review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: '创建评论' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Post('/')
  async create(@Req() req, @Body() createReviewDto: CreateReviewsDto) {
    const { accountId } = req.user;
    await this.reviewService.create(accountId, createReviewDto);
  }

  @ApiOperation({ summary: '获取用户所有评论' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Get('/')
  findAll(@Req() req, @Query() pageSizeDto: PageSizeDto) {
    const { accountId } = req.user;
    return this.reviewService.findAll({ accountId }, pageSizeDto);
  }

  // 获取订单详情
  @ApiOperation({ summary: '获取评论详情' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.reviewService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
  //   return this.reviewService.update(+id, updateReviewDto);
  // }

  //删除订单
  @ApiOperation({ summary: '删除评价' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', required: true, description: 'token' })
  @UseGuards(AuthGuard('buyer'))
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.reviewService.remove(+id);
  }
}
