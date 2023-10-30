/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 18:25:17
 * @Description:
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Info {
  //id
  @PrimaryGeneratedColumn()
  id: number;

  //标题
  @Column()
  title: string;

  //富文本
  @Column({ type: 'text' })
  content: string;

  //创建时间
  @CreateDateColumn()
  createTime: Date;
}
