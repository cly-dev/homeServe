/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 19:41:59
 * @Description: 响应拦截
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
@Injectable()
export class ResInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          status: 200,
          message: 'success',
        };
      }),
    );
  }
}
