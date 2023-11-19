/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 18:25:17
 * @Description: 评分
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entities';
import { Service } from './service.entities';
import { Order } from './order.entities';

@Entity()
export class Comment {
  //id
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account)
  @JoinColumn()
  account: Account;

  @OneToOne(() => Service)
  @JoinColumn()
  service: Service;

  @OneToOne(() => Order)
  order: Order;

  //评论内容
  @Column()
  content: string;

  //评分
  @Column()
  rate: number;

  //  是否在前台显示
  @Column()
  isShow: boolean;

  //创建时间
  @CreateDateColumn()
  createTime: Date;
}
