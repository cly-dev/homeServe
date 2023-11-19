/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-29 20:35:58
 * @Description:
 */
import {
  CreateShopConfigDto,
  UpdateShopConfigDto,
} from '../../dto/shopConfig.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopConfig } from '../..//entities/shopConfig.entities';
import { Repository } from 'typeorm';
import { ShopConfigEnum } from '../../enum/column.enum';

@Injectable()
export class ShopConfigService {
  constructor(
    @InjectRepository(ShopConfig)
    private readonly shopConfigRep: Repository<ShopConfig>,
  ) {}

  // 新增配置
  async create(CreateShopConfigDto: CreateShopConfigDto) {
    await this.shopConfigRep.save(CreateShopConfigDto);
  }

  //查询所有配置
  async findAll() {
    const [data, total] = await this.shopConfigRep
      .createQueryBuilder()
      .getManyAndCount();
    return {
      data,
      total,
    };
  }

  //查询某一个类型的配置
  async findByType(type: ShopConfigEnum) {
    console.log('-=----------aa');
    return await this.shopConfigRep
      .createQueryBuilder('entity')
      .where('entity.type = :type', { type })
      .getMany();
  }

  //查询某一个配置
  async findOne(id: number) {
    return await this.shopConfigRep.findOne({ where: { id } });
  }
  //更新
  async update(id: number, updateShopConfigDto: UpdateShopConfigDto) {
    const data = await this.shopConfigRep.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException('该条记录不存在');
    }
    this.shopConfigRep.merge(data, updateShopConfigDto);
    await this.shopConfigRep.save(data);
  }
  //删除
  async remove(id: number) {
    return await this.shopConfigRep.delete(id);
  }
}
