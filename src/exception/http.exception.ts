/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 19:46:39
 * @Description:
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse();
    try {
      const status = exception.getStatus();
      if (status !== 200) {
        res.status(status).send({
          status,
          data: exception.stack,
          message: exception.message,
        });
      }
    } catch {
      res.status(500).send({
        status: 500,
        message: 'system busy',
      });
    }
  }
}
