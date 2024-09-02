import { PrismaService } from "@/database/prisma.service";
import { Body, Controller, Post } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation.pipe";

const bodySchema = z.object({
  email: z.string().email().min(1).max(255),
  password: z.string().min(8).max(255),
})

const bodyValidationPipe = new ZodValidationPipe(bodySchema)

type BodySchema = z.infer<typeof bodySchema>

@Controller()
export class RegisterUserController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async execute(@Body(bodyValidationPipe) body: BodySchema) {}
}