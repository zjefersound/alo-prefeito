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

@Authorization('fetch', 'incident')
@Controller('/users/incidents')
export class FetchAuthorIncidentsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async execute(
    @User() user: UserPayload,
    @Query('page', pageQueryValidationPipe) page: PageQueryParamSchema,
    @Query('perPage', perPageQueryValidationPipe)
    perPage: PerPageQueryParamSchema,
  ) {
    const skip = (page - 1) * perPage

    const [incidents, totalCount] = await Promise.all([
      this.prisma.incident.findMany({
        take: perPage,
        skip,
        where: {
          authorId: user.sub,
        },
        select: {
          id: true,
          title: true,
          content: true,
          latitude: true,
          longitude: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          createdAt: true,
          attachments: {
            select: {
              url: true,
            },
          },
        },
      }),
      this.prisma.incident.count({
        where: {
          authorId: user.sub,
        },
      }),
    ])

    return {
      totalCount,
      incidents,
    }
  }
}
