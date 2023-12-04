/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 18:25:17
 * @Description:收藏
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Account } from './account.entities';
import { Review } from './review.entities';

import { OrderStatusEnum } from '../enum/column.enum';

@Entity()
export class Order {
  //订单id
  @PrimaryColumn()
  orderId: string;

  //用户
  @ManyToOne(() => Account, (account) => account.order)
  @JoinColumn({ name: 'accountId' })
  account: Account;

  //地址快照
  @Column({ nullable: true, default: '' })
  addressCache: string;

  //服务快照
  @Column('longtext')
  serviceCache: string;

  //其他要求
  @Column({ nullable: true, default: '' })
  remark: string;

  // 总价
  @Column({ nullable: true })
  totalPrice: number;

  //总数量
  @Column({ nullable: true, default: 1 })
  count: number;

  //订单删除状态
  @Column({ nullable: true, default: false })
  isDelete: boolean;

  //服务开始时间
  @Column({ nullable: true, default: '' })
  serviceStartTime: string;

  //订单状态
  @Column({
    enum: OrderStatusEnum,
    type: 'enum',
    default: OrderStatusEnum.WAIT_COMFIRM,
  })
  orderStatus: OrderStatusEnum;

  //取消留言
  @Column({ nullable: true, default: '' })
  returnReason: string;

  //创建时间
  @CreateDateColumn()
  createTime: Date;

  //支付时间
  @Column({ nullable: true, default: '' })
  payTime: string;

  @OneToOne(() => Review, (review) => review.order)
  @JoinColumn()
  review: Review;
}
