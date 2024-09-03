import { Authorization } from '@/auth/decorators/authorization.decorator'
import { User } from '@/auth/decorators/user.decorator'
import { UserPayload } from '@/auth/jwt.strategy'
import { PrismaService } from '@/database/prisma.service'
import { Controller, Get, NotFoundException } from '@nestjs/common'

@Authorization('get', 'user')
@Controller('/users/profile')
export class GetUserProfileController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async execute(@User() { sub: userId }: UserPayload) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return {
      user,
    }
  }
}
