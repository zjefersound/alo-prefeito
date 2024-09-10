import { Authorization } from '@/auth/decorators/authorization.decorator'
import { PrismaService } from '@/database/prisma.service'
import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'

@Authorization('register', 'incident')
@Controller('/incidents/attachments')
export class UploadAttachmentsController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  async execute(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2, // 2mb
          }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    const attachmentsIds: string[] = []

    for (const file of files) {
      const [, extension] = file.mimetype.split('/')

      const fileName = randomUUID() + '.' + extension

      const { id } = await this.prisma.attachment.create({
        data: {
          url: fileName,
          type: file.mimetype,
        },
      })

      writeFileSync(join('uploads', fileName), file.buffer)

      attachmentsIds.push(id)
    }

    return { attachmentsIds }
  }
}
