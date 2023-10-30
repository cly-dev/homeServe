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
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Account {
  //用户手机号码
  @PrimaryColumn()
  accountId: string;

  //头像
  @Column({ nullable: true, default: '/public' })
  avatar?: string;

  //昵称
  @Column()
  nickName?: string;

  //密码
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: AccountStatusEnum,
    default: AccountStatusEnum.ACTIVED,
  })
  status: AccountStatusEnum;

  //注册时间
  @CreateDateColumn()
  joinTime: Date;
}
