import { PrismaService } from '@/database/prisma.service'
import { Body, Controller, NotFoundException, Post } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { Authorization } from '@/auth/decorators/authorization.decorator'
import { User } from '@/auth/decorators/user.decorator'
import { UserPayload } from '@/auth/jwt.strategy'

const bodySchema = z.object({
  categoryId: z.string().min(1),
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  latitude: z.number().refine((value) => Math.abs(value) <= 180),
  longitude: z.number().refine((value) => Math.abs(value) <= 90),
})

const bodyValidationPipe = new ZodValidationPipe(bodySchema)

type BodySchema = z.infer<typeof bodySchema>

@Authorization('register', 'incident')
@Controller('/incidents')
export class RegisterIncidentController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async execute(
    @User() user: UserPayload,
    @Body(bodyValidationPipe) body: BodySchema,
  ) {
    const { content, latitude, longitude, title, categoryId } = body

    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    })

    if (!category) {
      throw new NotFoundException('Categoria não encontrada')
    }

    await this.prisma.incident.create({
      data: {
        content,
        latitude,
        longitude,
        title,
        authorId: user.sub,
        categoryId: category.id,
      },
    })
  }
}
