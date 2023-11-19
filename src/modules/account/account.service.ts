/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-29 22:00:59
 * @Description:
 */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateAccountDto,
  UpdateAccountDto,
  SearchAccountDto,
  UpdateAccountLoginInformationDto,
  UpdateAccountPasswordDto,
} from '../../dto/account.dto';
import { Repository } from 'typeorm';
import { Account } from '../../entities/account.entities';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private readonly accountRep: Repository<Account>,
  ) {}
  // 新增
  async create(createAccountDto: CreateAccountDto) {
    await this.accountRep.save({
      accountId: createAccountDto.code,
      nickName: createAccountDto.nickName,
      avatar: createAccountDto.avatar,
    });
  }
  //分页查询
  async findAll(searchAccountDto: SearchAccountDto) {
    const { page, size, phone, nickName } = searchAccountDto;
    const query = this.accountRep.createQueryBuilder('entity');
    if (phone) {
      query.where('entity.phone = :phone', { phone });
    }
    if (nickName) {
      query.where('entity.nickName LIKE :nickName', {
        nickName: `%${nickName}%`,
      });
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
    return await this.accountRep.findOne({
      where: { accountId },
      select: [
        'accountId',
        'avatar',
        'joinTime',
        'nickName',
        'phone',
        'status',
        'isInit',
      ],
    });
  }
  //更新用户信息
  async update(
    accountId: string,
    updateAccountDto: UpdateAccountDto | UpdateAccountPasswordDto,
  ) {
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
  //根据手机号码寻找用户信息
  async findByPhone(phone: string) {
    return this.accountRep.findOne({
      where: {
        phone,
      },
    });
  }
  //绑定用户的手机和密码
  async updateLoginInformation(
    accountId: string,
    LoginInfo: UpdateAccountLoginInformationDto,
  ) {
    const entity = await this.accountRep.findOne({
      where: {
        accountId,
      },
    });
    if (!entity) {
      throw new NotFoundException('该用户不存在');
    }
    const data = await this.accountRep.findOne({
      where: {
        phone: LoginInfo.phone,
      },
    });
    if (data) {
      throw new InternalServerErrorException('该手机号已被绑定');
    }
    LoginInfo.password = await argon2.hash(LoginInfo.password);

    this.accountRep.merge(entity, { ...LoginInfo, isInit: false });
    await this.accountRep.save(entity);
  }

  //更新用户的密码
  async updatePassword(
    accountId: string,
    UpdateAccountPasswordDto: UpdateAccountPasswordDto,
  ) {
    const { oldPassword, password } = UpdateAccountPasswordDto;
    const entity = await this.accountRep.findOne({ where: { accountId } });
    if (!entity) {
      throw new NotFoundException('非法访问');
    }
    console.log(entity);
    console.log(oldPassword);

    const isPasswordValid = await argon2.verify(entity.password, oldPassword);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new InternalServerErrorException('旧密码有误');
    }
    const hashPassword = await argon2.hash(password);
    this.accountRep.merge(entity, { password: hashPassword });
    await this.accountRep.save(entity);
  }
}
