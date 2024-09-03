import { z } from 'zod'

export const cpfSchema = z.string().min(14).max(14)
