/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-28 20:40:08
 * @Description:
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatePosterDto,
  SearchPosterDto,
  UpdatePosterDto,
} from '@dto/poster.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Poster } from '../../entities/poster.entities';
import { Repository } from 'typeorm';

@Injectable()
export class PosterService {
  constructor(
    @InjectRepository(Poster) private readonly posterRep: Repository<Poster>,
  ) {}

  //新增一个广告
  async create(createPosterDto: CreatePosterDto) {
    return await this.posterRep.save(createPosterDto);
  }

  //分页查询广告
  async findAll(SearchPosterDto: SearchPosterDto) {
    const { page = 1, size = 10, title, status } = SearchPosterDto;
    const query = this.posterRep.createQueryBuilder('entity');

    if (title) {
      query.where('entity.title Like :title', { title: `%${title}%` });
    }
    if (status) {
      query.andWhere('entity.status= :status', { status });
    }
    const [list, total] = await query
      .skip((+page - 1) * +size)
      .limit(+size)
      .getManyAndCount();
    return {
      list,
      total,
    };
  }

  // 查询某个广告
  async findOne(pId: number) {
    return await this.posterRep.findOne({
      where: {
        pId,
      },
    });
  }

  //修改某个广告
  async update(pId: number, updatePosterDto: UpdatePosterDto) {
    const entity = await this.posterRep.findOne({ where: { pId } });
    if (!entity) {
      throw new NotFoundException('该条记录不存在');
    }
    this.posterRep.merge(entity, updatePosterDto);
    return await this.posterRep.save(entity);
  }

  //删除广告
  async remove(pId: number) {
    return await this.posterRep.delete({
      pId,
    });
  }
}
