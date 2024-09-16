import { z } from 'zod'

export const keySubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('fetch'),
    z.literal('register'),
    z.literal('cancel'),
  ]),
  z.literal('key'),
])

export type keySubject = z.infer<typeof keySubject>
