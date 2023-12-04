import { OrderService } from './../order/order.service';
/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-19 23:39:26
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { CreateReviewsDto } from '../../dto/review.dto';
import { PageSizeDto } from '../../dto/common.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '../../entities/review.entities';
import { Order } from '../../entities/order.entities';
import { Service } from '../../entities/service.entities';
import { Repository } from 'typeorm';
import { Account } from '../../entities/account.entities';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRep: Repository<Review>,
    private readonly orderService: OrderService,
  ) {}
  //新建
  async create(accountId, createReviewDto: CreateReviewsDto) {
    const { orderId, serviceId } = createReviewDto;
    const order = new Order();
    const service = new Service();
    const account = new Account();
    account.accountId = accountId;
    service.id = serviceId;
    order.orderId = orderId;
    const data = await this.reviewRep.save({
      order,
      service,
      account,
      ...createReviewDto,
    });
    const review = new Review();
    review.id = data.id;
    await this.orderService.update(orderId, { review });
  }
  //
  async findAll(
    params: { orderId?: string; accountId?: string; serviceId?: number },
    searchDto: PageSizeDto,
  ) {
    const { orderId, accountId, serviceId } = params;
    const { page, size } = searchDto;
    const query = this.reviewRep.createQueryBuilder('review');
    query.leftJoinAndSelect('review.order', 'order');
    query.leftJoinAndSelect('review.service', 'service');
    query.leftJoinAndSelect('review.account', 'account');
    if (orderId) {
      query.where('review.orderId= :orderId', { orderId });
    }
    if (accountId) {
      query.where('review.accountId= :accountId', { accountId });
    }
    if (serviceId) {
      query.where('review.serviceId= :serviceId', { serviceId });
    }

    const [data, total] = await query
      .select(['review', 'account.accountId', 'service', 'order'])
      .skip((+page - 1) * +size)
      .take(+size)
      .getManyAndCount();
    return {
      data,
      total,
    };
  }

  async findOne(id: number) {
    const query = this.reviewRep.createQueryBuilder('review');
    query.where({
      id,
    });
    query.leftJoinAndSelect('review.order', 'order');
    query.leftJoinAndSelect('review.service', 'service');
    query.leftJoinAndSelect('review.account', 'account');
    query.select([
      'review.rate',
      'review.content',
      'review.isShow',
      'reivew.createTime',
      'account.nickName',
      'account.accountId',
      'order',
      'service',
    ]);
    return await query.getOne();
  }

  async update(id: number, isShow: boolean) {
    await this.reviewRep.update({ id }, { isShow });
  }

  async remove(id: number) {
    await this.reviewRep.delete(id);
  }
}
