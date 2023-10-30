/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 19:40:16
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { CreateAdminerDto } from '@dto/adminer.dto';
import { UpdateAdminerDto } from '@dto/adminer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Adminer } from '../../entities/adminer.entities';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { PageSizeDto } from '@/dto/common.dto';

@Injectable()
export class AdminerService {
  constructor(
    @InjectRepository(Adminer) private readonly adminerRep: Repository<Adminer>,
  ) {}
  //新增管理员
  async create(createAdminerDto: CreateAdminerDto) {
    const password = await argon2.hash('1234567');
    await this.adminerRep.save({
      ...createAdminerDto,
      password,
    });
  }
  //分页查询管理员
  async findAll(data: PageSizeDto) {
    const { page, size } = data;
    const [list, total] = await this.adminerRep
      .createQueryBuilder()
      .skip((page - 1) * size)
      .limit(size)

      .getManyAndCount();
    return {
      list,
      total,
    };
  }
  //寻找某个管理员
  async findOne(adminId: string) {
    return await this.adminerRep.findOne({
      where: {
        adminId,
      },
    });
  }

  update(id: number, updateAdminerDto: UpdateAdminerDto) {
    return `This action updates a #${id} adminer`;
  }

  async remove(adminId: string) {
    return await this.adminerRep.delete({ adminId });
  }
}
