import { PrismaService } from '@/database/prisma.service'
import { Body, ConflictException, Controller, Post } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { Authorization } from '@/auth/decorators/authorization.decorator'

const bodySchema = z.object({
  name: z.string().min(1).max(255),
})

const bodyValidationPipe = new ZodValidationPipe(bodySchema)

type BodySchema = z.infer<typeof bodySchema>

@Authorization('create', 'category')
@Controller('/categories')
export class CreateCategoryController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async execute(@Body(bodyValidationPipe) body: BodySchema) {
    const { name } = body

    const categoryWithSameName = await this.prisma.category.findFirst({
      where: {
        name,
      },
    })

    if (categoryWithSameName) {
      throw new ConflictException('Categoria já cadastrada')
    }

    await this.prisma.category.create({
      data: {
        name,
      },
    })
  }
}
