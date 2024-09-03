import { z } from 'zod'

export const roleSchema = z.union([
  z.literal('BACKOFFICE'),
  z.literal('API'),
  z.literal('CITIZEN'),
])

export type Role = z.infer<typeof roleSchema>
