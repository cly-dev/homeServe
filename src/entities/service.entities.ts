/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 18:25:17
 * @Description:
 */
import { PriceTypeEnum, ServiceStatusEnum } from '../enum/column.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './review.entities';

@Entity()
export class Service {
  //id
  @PrimaryGeneratedColumn()
  id: number;

  // 标题
  @Column()
  title: string;

  //简单描述
  @Column()
  desc: string;

  //图文描述
  @Column('longtext')
  content: string;

  //折扣价
  @Column()
  discountPrice: number;

  //收费类型
  @Column({
    type: 'enum',
    enum: PriceTypeEnum,
    nullable: true,
    default: PriceTypeEnum.Hour,
  })
  priceType: PriceTypeEnum;

  //最少服务时长
  @Column({ nullable: false, default: 2 })
  minServiceTime: number;

  //原价
  @Column({ nullable: true, default: 0 })
  originPrice: number;

  //图标
  @Column()
  iconUrl: string;

  //icon背景颜色
  @Column({ nullable: true, default: '' })
  iconBgColor: string;

  // //图片列表
  @Column({ nullable: true, default: '' })
  imagesUrl: string;

  //视频
  @Column({ nullable: true, default: '' })
  videoUrl: string;

  //服务状态
  @Column({
    type: 'enum',
    enum: ServiceStatusEnum,
    default: ServiceStatusEnum.OFF,
  })
  status: ServiceStatusEnum;

  //创建时间
  @CreateDateColumn()
  createTime: Date;

  @OneToMany(() => Review, (review) => review.service)
  @JoinColumn()
  review: Review[];
}
