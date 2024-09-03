import { Authorization } from '@/auth/decorators/authorization.decorator'
import { PrismaService } from '@/database/prisma.service'
import { Controller, Delete, NotFoundException, Param } from '@nestjs/common'

@Authorization('delete', 'incident')
@Controller('/incidents/:incidentId')
export class DeleteIncidenController {
  constructor(private prisma: PrismaService) {}

  @Delete()
  async execute(@Param('incidentId') incidentId: string) {
    const incident = await this.prisma.incident.findUnique({
      where: {
        id: incidentId,
      },
    })

    if (!incident) {
      throw new NotFoundException('Incidente não encontrado')
    }

    await this.prisma.incident.delete({
      where: {
        id: incident.id,
      },
    })
  }
}
