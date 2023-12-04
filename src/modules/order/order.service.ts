/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-10 21:52:12
 * @Description:
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entities';
import { Repository } from 'typeorm';
import { OrderStatusEnum } from '@/enum/column.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRep: Repository<Order>,
  ) {}

  //新增订单
  async create(data) {
    await this.orderRep.save(data);
  }
  //查询所有的订单
  async findAll(params: {
    orderStatus?: OrderStatusEnum;
    accountId?: string;
    orderId?: string;
    page: number;
    size: number;
  }) {
    const { accountId, page, size, orderStatus, orderId } = params;
    const query = this.orderRep.createQueryBuilder('order');
    query.leftJoinAndSelect('order.account', 'account');
    if (accountId) {
      query.where('order.accountId = :accountId', { accountId });
    }
    if (orderId) {
      query.andWhere('order.orderId = :orderId', { orderId });
    }
    if (orderStatus) {
      query.andWhere('order.orderStatus= :orderStatus', { orderStatus });
    }
    const [data, total] = await query
      .select([
        'account.nickName',
        'account.accountId',
        'order.orderId',
        'order.createTime',
        'order.payTime',
        'order.totalPrice',
        'order.orderStatus',
        'order.serviceStartTime',
        'order.addressCache',
        'order.serviceCache',
        'order.isDelete',
        'order.remark',
        'order.returnReason',
      ])
      .skip((+page - 1) * +size)
      .take(+size)
      .getManyAndCount();
    return {
      data,
      total,
    };
  }
  //查询特定订单的信息
  async findOne(orderId: string) {
    return await this.orderRep.findOne({
      order: {
        createTime: 'DESC',
      },
      where: {
        orderId,
      },

      relations: ['review'],
    });
  }
  //更新订单的信息
  async update(orderId: string, updateOrderDto: any) {
    const entity = await this.findOne(orderId);
    if (entity) {
      this.orderRep.merge(entity, updateOrderDto);
      await this.orderRep.save(entity);
    } else {
      throw new NotFoundException('订单不存在');
    }
  }
  //删除订单
  async remove(id: number) {
    const data = await this.orderRep.delete(id);
    if (!data.affected) {
    }
  }
}
