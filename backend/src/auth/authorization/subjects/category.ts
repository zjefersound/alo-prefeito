import { z } from 'zod'

export const categorySubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('fetch'),
    z.literal('delete'),
    z.literal('edit'),
  ]),
  z.literal('category'),
])

export type categorySubject = z.infer<typeof categorySubject>
