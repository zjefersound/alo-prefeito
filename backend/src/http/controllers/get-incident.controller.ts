import { Public } from '@/auth/decorators/public.decorator'
import { PrismaService } from '@/database/prisma.service'
import { Controller, Get, NotFoundException, Param } from '@nestjs/common'

@Public()
@Controller('/incidents/:id')
export class GetIncidentController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async execute(@Param('id') incidentId: string) {
    const incident = await this.prisma.incident.findFirst({
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
      where: {
        id: incidentId,
      },
    })

    if (!incident) {
      throw new NotFoundException('Incidente não encontrado')
    }

    return {
      incident,
    }
  }
}
