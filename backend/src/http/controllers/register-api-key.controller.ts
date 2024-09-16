import { Authorization } from '@/auth/decorators/authorization.decorator'
import { User } from '@/auth/decorators/user.decorator'
import { UserPayload } from '@/auth/jwt.strategy'
import { PrismaService } from '@/database/prisma.service'
import { Controller, Post } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'

@Authorization('register', 'key')
@Controller('/keys')
export class RegisterApiKeyController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async execute(@User() user: UserPayload) {
    const key = randomUUID()

    const keyHash = await hash(key, 8)

    await this.prisma.key.create({
      data: {
        userId: user.sub,
        keyHash,
      },
    })

    return {
      key,
    }
  }
}
