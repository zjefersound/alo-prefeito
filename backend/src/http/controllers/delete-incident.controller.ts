import { Authorization } from '@/auth/decorators/authorization.decorator'
import { User } from '@/auth/decorators/user.decorator'
import { UserPayload } from '@/auth/jwt.strategy'
import { PrismaService } from '@/database/prisma.service'
import {
  Controller,
  Delete,
  ForbiddenException,
  NotFoundException,
  Param,
} from '@nestjs/common'

@Authorization('delete', 'incident')
@Controller('/incidents/:incidentId')
export class DeleteIncidenController {
  constructor(private prisma: PrismaService) {}

  @Delete()
  async execute(
    @User() { sub: userId }: UserPayload,
    @Param('incidentId') incidentId: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const incident = await this.prisma.incident.findUnique({
      where: {
        id: incidentId,
      },
    })

    if (!incident) {
      throw new NotFoundException('Incidente não encontrado')
    }

    if (user.role === 'CITIZEN' && incident.authorId !== userId) {
      throw new ForbiddenException('Você não tem permissão')
    }

    await this.prisma.incident.delete({
      where: {
        id: incident.id,
      },
    })
  }
}
