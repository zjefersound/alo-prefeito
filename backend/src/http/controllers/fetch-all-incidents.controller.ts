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

@Authorization('fetch', 'incident')
@Controller('/incidents')
export class FetchAllIncidentsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async execute(
    @Query('page', pageQueryValidationPipe) page: PageQueryParamSchema,
    @Query('perPage', perPageQueryValidationPipe)
    perPage: PerPageQueryParamSchema,
  ) {
    const skip = (page - 1) * perPage

    const [incidents, totalCount] = await Promise.all([
      this.prisma.incident.findMany({
        take: perPage,
        skip,
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
        },
      }),
      this.prisma.incident.count(),
    ])

    return {
      totalCount,
      incidents,
    }
  }
}
