import { PrismaService } from '@/database/prisma.service'
import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { compare } from 'bcryptjs'
import { emailSchema } from '../schemas/email-schema'
import { passwordSchema } from '../schemas/password-schema'
import { JwtService } from '@nestjs/jwt'
import { Public } from '@/auth/decorators/public.decorator'

const bodySchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

const bodyValidationPipe = new ZodValidationPipe(bodySchema)

type BodySchema = z.infer<typeof bodySchema>

@Public()
@Controller('/sessions')
export class AuthenticateUserController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  async execute(@Body(bodyValidationPipe) body: BodySchema) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    const invalidCredentialsMessage = 'Credenciais inválidas'

    if (!user) {
      throw new BadRequestException(invalidCredentialsMessage)
    }

    const isPasswordValid = await compare(password, user.passwordHash)

    if (!isPasswordValid) {
      throw new BadRequestException(invalidCredentialsMessage)
    }

    const jwtPayload = {
      sub: user.id,
    }

    const accessToken = await this.jwt.signAsync(jwtPayload)

    return {
      accessToken,
    }
  }
}
