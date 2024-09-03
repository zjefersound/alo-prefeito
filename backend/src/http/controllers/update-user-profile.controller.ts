import { PrismaService } from '@/database/prisma.service'
import { Body, ConflictException, Controller, Put } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { emailSchema } from '../schemas/email-schema'
import { Authorization } from '@/auth/decorators/authorization.decorator'
import { nameSchema } from '../schemas/name-schema'
import { cpfSchema } from '../schemas/cpf-schema'
import { phoneSchema } from '../schemas/phone-schema'
import { User } from '@/auth/decorators/user.decorator'
import { UserPayload } from '@/auth/jwt.strategy'

const bodySchema = z.object({
  email: emailSchema,
  name: nameSchema,
  cpf: cpfSchema,
  phone: phoneSchema,
})

const bodyValidationPipe = new ZodValidationPipe(bodySchema)

type BodySchema = z.infer<typeof bodySchema>

@Authorization('update', 'user')
@Controller('/users')
export class UpdateUserProfileController {
  constructor(private prisma: PrismaService) {}

  @Put()
  async execute(
    @User() { sub: userId }: UserPayload,
    @Body(bodyValidationPipe) body: BodySchema,
  ) {
    const { email, cpf, name, phone } = body

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new ConflictException('Usuário não encontrado')
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        cpf,
        email,
        name,
        phone,
      },
    })
  }
}
