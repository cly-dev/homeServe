/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 18:25:17
 * @Description:
 */
import { AccountStatusEnum } from '../enum/column.enum';
import {
  AcceptedFields,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Collect } from './collect.entities';
import { Address } from './address.entities';
import { Order } from './order.entities';
import { Comment } from './comment.entities';

@Entity()
export class Account {
  //openId
  @PrimaryColumn()
  accountId: string;

  //头像
  @Column({ nullable: true, default: '/public' })
  avatar?: string;

  //电话号码
  @Column({ nullable: true })
  phone?: string;

  //昵称
  @Column()
  nickName?: string;

  //密码
  @Column({ nullable: true })
  password: string;

  //初始态
  @Column({ nullable: true, default: true })
  isInit: boolean;

  //用户状态
  @Column({
    type: 'enum',
    enum: AccountStatusEnum,
    default: AccountStatusEnum.ACTIVED,
  })
  status: AccountStatusEnum;

  //注册时间
  @CreateDateColumn()
  joinTime: Date;

  //收藏
  @OneToMany(() => Collect, (collect) => collect.account)
  @JoinColumn()
  collect: Collect[];

  //地址
  @OneToMany(() => Address, (address) => address.account)
  @JoinColumn()
  address: Address[];

  //订单
  @OneToMany(() => Order, (order) => order.account)
  @JoinColumn()
  order: Order[];

  //评论
  @OneToMany(() => Comment, (comment) => comment.account)
  @JoinColumn()
  comment: Comment[];
}
