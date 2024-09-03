import { z } from 'zod'

export const phoneSchema = z.string().min(11).max(11)
