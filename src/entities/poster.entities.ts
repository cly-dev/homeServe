/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 18:25:17
 * @Description:
 */
import { statusEnum } from '../enum/column.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Poster {
  //id
  @PrimaryGeneratedColumn()
  pId: number;

  //图片
  @Column()
  imageUrl: string;

  //链接
  @Column({ nullable: true })
  link: string;

  //标题
  @Column()
  title: string;

  //状态
  @Column({
    type: 'enum',
    enum: statusEnum,
    default: statusEnum.OFF,
  })
  status: statusEnum;

  //创建时间
  @CreateDateColumn()
  createTime: Date;
}
