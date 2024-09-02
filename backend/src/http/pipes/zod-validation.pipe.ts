import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.flatten().fieldErrors

        const message = Object.keys(validationErrors)
          .map((key) => {
            return `${key}: ${validationErrors[key]?.join(' & ')}`
          })
          .join('; ')

        throw new BadRequestException(message)
      }

      throw new BadRequestException('Validation failed')
    }
  }
}