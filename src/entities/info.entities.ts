/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 18:25:17
 * @Description:
 */
import { InfoService } from '../modules/info/info.service';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
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

  //自增
  // @Generated('increment')

  @Column({ type: 'integer', nullable: true, default: 0 })
  sortValue: number;

  //富文本
  @Column({ type: 'text' })
  content: string;

  //创建时间
  @CreateDateColumn()
  createTime: Date;

  // 在插入记录之前触发的事件，用于设置排序值
  // @BeforeInsert()
  // setSortValue() {
  //   // 在这里你可以实现获取当前最大排序值，并加一，确保唯一递增
  //   // 这个例子假设你有一个服务或者查询来获取当前最大的 sortValue
  //   const currentMaxSortValue = ;

  //   // 设置当前记录的 sortValue
  //   this.sortValue = currentMaxSortValue + 1;
  // }
}
