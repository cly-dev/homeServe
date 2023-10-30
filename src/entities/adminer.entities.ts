/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 18:25:17
 * @Description:
 */
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Adminer {
  //账号
  @PrimaryColumn()
  adminId: string;

  //头像
  @Column({ nullable: true, default: '/public' })
  avatar?: string;

  //昵称
  @Column()
  nickName?: string;

  //密码
  @Column()
  password: string;
  //注册时间
  @CreateDateColumn()
  joinTime: Date;
}
