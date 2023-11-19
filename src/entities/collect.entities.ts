/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 18:25:17
 * @Description:收藏
 */
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entities';
import { Service } from './service.entities';

@Entity()
export class Collect {
  //id
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.collect)
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @OneToOne(() => Service)
  @JoinColumn({ name: 'serviceId' })
  service: Service;

  //创建时间
  @CreateDateColumn()
  createTime: Date;
}
