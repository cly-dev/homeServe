/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-29 22:00:59
 * @Description:
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateAccountDto,
  UpdateAccountDto,
  SearchAccountDto,
} from '../../dto/account.dto';
import { Repository } from 'typeorm';
import { Account } from '../../entities/account.entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private readonly accountRep: Repository<Account>,
  ) {}
  // 新增
  async create(createAccountDto: CreateAccountDto) {
    await this.accountRep.create(createAccountDto);
  }
  //分页查询
  async findAll(searchAccountDto: SearchAccountDto) {
    const { page, size, accountId, nickName } = searchAccountDto;
    const query = this.accountRep.createQueryBuilder('entity');
    if (accountId) {
      query.where('entity.accountId = :accountId', { accountId });
    }
    if (nickName) {
      query.where('entity.nickName = :nickName', { nickName });
    }
    const [list, total] = await query
      .skip((page - 1) * size)
      .limit(size)
      .getManyAndCount();
    return {
      list,
      total,
    };
  }
  // 寻找某一个用户
  async findOne(accountId: string) {
    return await this.accountRep.findOne({ where: { accountId } });
  }
  //更新用户信息
  async update(accountId: string, updateAccountDto: UpdateAccountDto) {
    const entity = await this.accountRep.findOne({ where: { accountId } });
    if (!entity) {
      throw new NotFoundException('该用户不存在');
    }
    this.accountRep.merge(entity, updateAccountDto);
    await this.accountRep.save(entity);
  }
  //删除用户信息
  async remove(accountId: string) {
    return await this.accountRep.delete(accountId);
  }
}
