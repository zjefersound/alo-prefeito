import { z } from 'zod'

export const emailSchema = z.string().email().min(6).max(255)
