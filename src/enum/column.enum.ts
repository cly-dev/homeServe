/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-29 16:29:08
 * @Description:
 */
//店铺配置
export enum ShopConfigEnum {
  'ABOUTUS' = 'aboutus',
}
//服务收费类型
export enum PriceTypeEnum {
  //按小时收费
  'Hour' = 'hour',
  //按天收费
  'Day' = 'day',
}

//用户状态
export enum AccountStatusEnum {
  //正常
  'ACTIVED' = '1',
  //被管理员禁用
  'DISABLED' = '2',
}
//服务状态
export enum ServiceStatusEnum {
  //上架
  'ON' = '1',
  //下架
  'OFF' = '2',
}

//订单状态
export enum OrderStatusEnum {
  //待支付
  'WAIT_PAY' = 'WAIT_PAY',
  //进行中
  'PROGRESS' = 'PROGRESS',
  //待服务
  'WAIT_SERVICE' = 'WAIT_SERVICE',
  //待确认
  'WAIT_COMFIRM' = 'WAIT_COMFIRM',
  //待评价
  'WAIT_EVALUATE' = 'WAIT_EVALUATE',
  //已完成
  'FINISH' = 'FINISH',
  //取消
  'CANCEL' = 'CANCEL',
  //管理员取消
  'ADMIN_CANCEL' = 'ADMIN_CANCEL',
}

//常规状态枚举
export enum statusEnum {
  //启用
  ON = '1',
  //禁用
  OFF = '2',
}
