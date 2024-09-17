import { PrismaService } from '@/database/prisma.service'
import { Controller, ForbiddenException, Get, Query } from '@nestjs/common'
import {
  PageQueryParamSchema,
  pageQueryValidationPipe,
} from '../pipes/page.pipe'
import {
  PerPageQueryParamSchema,
  perPageQueryValidationPipe,
} from '../pipes/per-page.pipe'
import { ApiKey } from '@/auth/decorators/api-key.decorator'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { Public } from '@/auth/decorators/public.decorator'
import { compare } from 'bcryptjs'

const clientIdQueryParamSchema = z.string().min(1)

export const clientIdQueryValidationPipe = new ZodValidationPipe(
  clientIdQueryParamSchema,
)

export type ClientIdQueryParamSchema = z.infer<typeof clientIdQueryParamSchema>

@Public()
@Controller('/incidents/api')
export class FetchApiIncidentsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async execute(
    @ApiKey() apiKey: string,
    @Query('page', pageQueryValidationPipe) page: PageQueryParamSchema,
    @Query('perPage', perPageQueryValidationPipe)
    perPage: PerPageQueryParamSchema,
    @Query('clientId', clientIdQueryValidationPipe)
    clientId: ClientIdQueryParamSchema,
  ) {
    const key = await this.prisma.key.findFirst({
      where: {
        userId: clientId,
        canceledAt: null,
      },
    })

    const invalidCredentialsMessage = 'Credenciais inválidas'

    if (!key) {
      throw new ForbiddenException(invalidCredentialsMessage)
    }

    const isApiKeyValid = await compare(apiKey, key.keyHash)

    if (!isApiKeyValid) {
      throw new ForbiddenException(invalidCredentialsMessage)
    }

    const skip = (page - 1) * perPage

    const [incidents, totalCount] = await Promise.all([
      this.prisma.incident.findMany({
        take: perPage,
        skip,
        orderBy: {
          createdAt: 'desc',
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
      this.prisma.incident.count(),
    ])

    return {
      totalCount,
      incidents,
    }
  }
}
