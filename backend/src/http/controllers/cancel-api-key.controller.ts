import { Authorization } from '@/auth/decorators/authorization.decorator'
import { User } from '@/auth/decorators/user.decorator'
import { UserPayload } from '@/auth/jwt.strategy'
import { PrismaService } from '@/database/prisma.service'
import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common'

@Authorization('cancel', 'key')
@Controller('/keys/cancel')
export class CancelApiKeyController {
  constructor(private prisma: PrismaService) {}

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  async execute(@User() user: UserPayload) {
    const key = await this.prisma.key.findFirst({
      where: {
        canceledAt: null,
        userId: user.sub,
      },
    })

    if (!key) {
      throw new BadRequestException('Você não possui chaves registradas')
    }

    await this.prisma.key.update({
      where: {
        id: key.id,
      },
      data: {
        canceledAt: new Date(),
      },
    })
  }
}
