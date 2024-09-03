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

@Authorization('fetch', 'category')
@Controller('/categories')
export class FetchCategoriesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async execute(
    @Query('page', pageQueryValidationPipe) page: PageQueryParamSchema,
    @Query('perPage', perPageQueryValidationPipe)
    perPage: PerPageQueryParamSchema,
  ) {
    const skip = (page - 1) * perPage

    const [categories, totalCount] = await Promise.all([
      this.prisma.category.findMany({
        take: perPage,
        skip,
      }),
      this.prisma.category.count(),
    ])

    return {
      totalCount,
      categories,
    }
  }
}
