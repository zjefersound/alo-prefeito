import { Authorization } from '@/auth/decorators/authorization.decorator'
import { PrismaService } from '@/database/prisma.service'
import { Controller, Get, Query } from '@nestjs/common'
import {
  PageQueryParamSchema,
  pageQueryValidationPipe,
} from '../pipes/page.pipe'
import {
  PerPageQueryParamSchema,
  perPageQueryValidationPipe,
} from '../pipes/per-page.pipe'
import { User } from '@/auth/decorators/user.decorator'
import { UserPayload } from '@/auth/jwt.strategy'

@Authorization('fetch', 'key')
@Controller('/keys')
export class FetchApiKeysController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async execute(
    @User() user: UserPayload,
    @Query('page', pageQueryValidationPipe) page: PageQueryParamSchema,
    @Query('perPage', perPageQueryValidationPipe)
    perPage: PerPageQueryParamSchema,
  ) {
    const skip = (page - 1) * perPage

    const [keys, totalCount] = await Promise.all([
      this.prisma.key.findMany({
        take: perPage,
        skip,
        select: {
          id: true,
          canceledAt: true,
          createdAt: true,
        },
        where: {
          userId: user.sub,
        },
      }),
      this.prisma.key.count({
        where: {
          userId: user.sub,
        },
      }),
    ])

    return {
      totalCount,
      keys,
    }
  }
}
