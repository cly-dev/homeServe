/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-03 21:23:25
 * @Description:
 */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from '../../entities/service.entities';
import { Repository } from 'typeorm';
import {
  CreateServiceDto,
  SearchServiceDto,
  UpdateServiceDto,
} from '../../dto/service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service) private readonly serviceRep: Repository<Service>,
  ) {}
  //新增
  async create(createServiceDto: CreateServiceDto) {
    createServiceDto.discountPrice = +createServiceDto.discountPrice;
    if (createServiceDto.originPrice) {
      createServiceDto.originPrice = +createServiceDto.originPrice;
    }
    await this.serviceRep.save(createServiceDto);
  }
  //分页查询服务
  async findAll(searchServiceDto: SearchServiceDto) {
    const { page, size, title, status } = searchServiceDto;
    const query = this.serviceRep.createQueryBuilder('service');
    if (title) {
      query.andWhere('service.title like :title', { title: `%${title}%` });
    }
    if (status) {
      query.andWhere('service.status= :status', { status });
    }
    const [data, total] = await query
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();
    return {
      data,
      total,
    };
  }
  // 查询某个服务
  async findOne(id: number) {
    return await this.serviceRep.findOne({
      where: {
        id,
      },
    });
  }
  //更新某个服务
  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const entity = await this.serviceRep.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('该服务不存在');
    }
    this.serviceRep.merge(entity, updateServiceDto);
    await this.serviceRep.save(entity);
  }
  //删除某个服务
  async remove(id: number) {
    try {
      await this.serviceRep.delete(id);
    } catch (err) {
      throw new InternalServerErrorException('删除失败');
    }
  }
}
