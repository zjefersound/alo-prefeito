import { PrismaService } from '@/database/prisma.service'
import { Body, ConflictException, Controller, Post } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { hash } from 'bcryptjs'
import { emailSchema } from '../schemas/email-schema'
import { passwordSchema } from '../schemas/password-schema'
import { Public } from '@/auth/decorators/public.decorator'
import { nameSchema } from '../schemas/name-schema'
import { cpfSchema } from '../schemas/cpf-schema'
import { phoneSchema } from '../schemas/phone-schema'

const bodySchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  cpf: cpfSchema,
  phone: phoneSchema,
  role: z.enum(['CITIZEN', 'API']),
})

const bodyValidationPipe = new ZodValidationPipe(bodySchema)

type BodySchema = z.infer<typeof bodySchema>

@Public()
@Controller('/users')
export class RegisterUserController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async execute(@Body(bodyValidationPipe) body: BodySchema) {
    const { email, cpf, name, role, phone, password } = body

    const userWithSameEmail = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })

    const userWithSameCpf = await this.prisma.user.findFirst({
      where: {
        cpf,
      },
    })

    if (userWithSameEmail || userWithSameCpf) {
      throw new ConflictException('Usuário já cadastrado')
    }

    const passwordHash = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        cpf,
        email,
        name,
        phone,
        passwordHash,
        role,
      },
    })
  }
}
