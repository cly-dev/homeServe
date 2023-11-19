/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 18:25:17
 * @Description:
 */
import { ShopConfigEnum } from '../enum/column.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ShopConfig {
  //id
  @PrimaryGeneratedColumn()
  id: number;

  //类型
  @Column({
    type: 'enum',
    enum: ShopConfigEnum,
    default: ShopConfigEnum.ABOUTUS,
  })
  type: string;

  //标题
  @Column()
  title: string;

  //富文本
  @Column('longtext')
  content: string;
  //创建时间
  @CreateDateColumn()
  createTime: Date;
}
