/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-09 21:41:35
 * @Description:
 */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../../entities/address.entities';
import { Repository } from 'typeorm';
import { CreateAddressDto, UpdateAddrssDto } from '../../dto/address.dto';
import { Account } from '../../entities/account.entities';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private readonly addressRep: Repository<Address>,
  ) {}
  //新建
  async create(accountId, createAdressDto: CreateAddressDto) {
    const account = new Account();
    account.accountId = accountId;
    if (createAdressDto.isDefault) {
      await this.updateDefault();
    }
    await this.addressRep.save({ account, ...createAdressDto });
  }
  //查询全部
  async findAll(accountId: string) {
    return await this.addressRep.find({
      where: {
        account: {
          accountId,
        },
      },
    });
  }
  //查看某个地址
  async findOne(id: number) {
    return await this.addressRep.findOne({
      where: {
        id,
      },
    });
  }
  //更新
  async update(id: number, updateAdressDto: UpdateAddrssDto) {
    const { isDefault } = updateAdressDto;
    if (isDefault) {
      this.updateDefault();
    }
    const entity = await this.addressRep.findOne({
      where: {
        id,
      },
    });
    this.addressRep.merge(entity, updateAdressDto);
    await this.addressRep.save(entity);
  }
  //取消默认地址
  async updateDefault() {
    const address = await this.addressRep.findOne({
      where: {
        isDefault: true,
      },
    });
    if (address) {
      address.isDefault = false;
      await this.addressRep.save(address);
    }
  }
  //删除地址
  async remove(id: number) {
    const data = await this.addressRep.delete({ id });
    if (data.affected === 0) {
      throw new InternalServerErrorException('没有收藏该服务');
    }
  }
}
