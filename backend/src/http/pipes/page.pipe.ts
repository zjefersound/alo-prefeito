import { z } from 'zod'
import { ZodValidationPipe } from './zod-validation.pipe'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

export const pageQueryValidationPipe = new ZodValidationPipe(
  pageQueryParamSchema,
)

export type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>
