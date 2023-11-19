/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-09 21:12:56
 * @Description:
 */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entities';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  //街道
  @Column()
  street: string;

  //城市
  @Column()
  city: string;

  //联系人
  @Column()
  userName: string;

  //电话
  @Column()
  phone: string;

  //默认地址
  @Column()
  isDefault: boolean;

  @ManyToOne(() => Account, (account) => account.address)
  @JoinColumn({ name: 'addressId' })
  account: Account;
}
