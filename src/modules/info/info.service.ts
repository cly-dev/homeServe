/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-29 15:24:26
 * @Description:
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Info } from '../../entities/info.entities';
import { Repository } from 'typeorm';
import { CreateInfoDto, SearchiInfoDto, UpdateInfoDto } from '@/dto/info.dto';

@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(Info) private readonly infoRep: Repository<Info>,
  ) {}

  //新增一个资讯
  async create(createInfoDto: CreateInfoDto) {
    return await this.infoRep.save(createInfoDto);
  }

  //分页查询资讯
  async findAll(SearchInfoDto: SearchiInfoDto) {
    const { page = 1, size = 10, title } = SearchInfoDto;
    const query = this.infoRep.createQueryBuilder('entity');

    if (title) {
      query.where('entity.title Like :title', { title: `%${title}%` });
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

  // 查询某个资讯
  async findOne(id: number) {
    return await this.infoRep.findOne({
      where: {
        id,
      },
    });
  }

  //修改某个资讯
  async update(id: number, UpdateInfoDto: UpdateInfoDto) {
    const entity = await this.infoRep.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('该条记录不存在');
    }
    this.infoRep.merge(entity, UpdateInfoDto);
    return await this.infoRep.save(entity);
  }

  //删除资讯
  async remove(id: number) {
    return await this.infoRep.delete({
      id,
    });
  }
}
