import { Public } from '@/auth/decorators/public.decorator'
import { PrismaService } from '@/database/prisma.service'
import { Controller, Get } from '@nestjs/common'

@Public()
@Controller('/incidents/latest')
export class FetchLastIncidentsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async execute() {
    const incidents = await this.prisma.incident.findMany({
      take: 5,
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
      },
    })

    return {
      incidents,
    }
  }
}
