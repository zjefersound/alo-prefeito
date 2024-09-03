import { z } from 'zod'

export const userSubject = z.tuple([
  z.union([z.literal('manage'), z.literal('get'), z.literal('update')]),
  z.literal('user'),
])

export type userSubject = z.infer<typeof userSubject>
