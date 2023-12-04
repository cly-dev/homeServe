/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-10 22:51:33
 * @Description:
 */
import { v4 as uuidv4 } from 'uuid';
//生成订单号,当前的时间戳和用户的accountId拼接成一个13位的订单号
export const generateOrderNumber = (accountId): string => {
  const timestamp = Math.floor(Date.now() / 100000); //取当前时间戳-前6位
  const hash = uuidv4(); // 取随机字符串-前4位
  const orderNumber = `eh${timestamp}${hash.substr(0, 4)}`;
  return orderNumber;
};
