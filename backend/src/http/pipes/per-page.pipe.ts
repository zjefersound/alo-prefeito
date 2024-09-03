import { z } from 'zod'
import { ZodValidationPipe } from './zod-validation.pipe'

const perPageQueryParamSchema = z
  .string()
  .optional()
  .default('10')
  .transform(Number)
  .pipe(z.number().min(1))

export const perPageQueryValidationPipe = new ZodValidationPipe(
  perPageQueryParamSchema,
)

export type PerPageQueryParamSchema = z.infer<typeof perPageQueryParamSchema>
