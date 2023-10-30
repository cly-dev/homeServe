/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-10-27 21:44:52
 * @Description:
 */
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PublicService } from './public.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDto } from '../../dto/common.dto';
import { ConfigService } from '@nestjs/config';
import { DIR } from '../../enum/config.enum';
@ApiTags('公共接口')
@Controller('public')
export class PublicController {
  constructor(private readonly configService: ConfigService) {}

  @ApiOperation({ summary: '上传文件接口' })
  @ApiConsumes('multipart/form-data') // 指定请求头为 multipart/form-data
  @ApiBody({
    description: 'Upload a single file',
    type: UploadDto,
  })
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    const webSite = 'http://localhost:3000';
    return {
      filename: `${webSite}${this.configService.get(DIR.UPLOAD_DIR)}/${
        file.filename
      }`,
    };
  }
}
