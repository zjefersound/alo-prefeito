import { z } from 'zod'

export const passwordSchema = z.string().email().min(8).max(255)
