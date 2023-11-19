/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-06 19:38:58
 * @Description:
 */
import { Account } from '../../entities/account.entities';
import { CreateCollectDto } from '../../dto/collect.dto';
import { Collect } from '../../entities/collect.entities';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../../entities/service.entities';

@Injectable()
export class CollectService {
  constructor(
    @InjectRepository(Collect) private collectRepository: Repository<Collect>,
  ) {}

  //新增
  async create(accountId: string, createCollectDto: CreateCollectDto) {
    const account = new Account();
    const service = new Service();
    account.accountId = accountId;
    service.id = +createCollectDto.serviceId;
    await this.collectRepository.save({
      account,
      service,
    });
  }

  //删除
  async remove(serviceId: number, accountId: string) {
    const data = await this.collectRepository.delete({
      service: {
        id: serviceId,
      },
      account: {
        accountId: accountId,
      },
    });
    if (data.affected === 0) {
      throw new InternalServerErrorException('没有收藏该服务');
    }
  }

  //验证用户是否有收藏
  async check(serviceId: number, accountId: string) {
    return await this.collectRepository.findOne({
      where: {
        service: {
          id: serviceId,
        },
        account: {
          accountId: accountId,
        },
      },
    });
  }

  //查询用户所有的收藏
  async findAll(accountId: string) {
    return await this.collectRepository.find({
      where: {
        account: {
          accountId: accountId,
        },
      },
      relations: ['service'],
    });
  }
}
