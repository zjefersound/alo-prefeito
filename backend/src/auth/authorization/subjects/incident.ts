import { z } from 'zod'
import { incidentSchema } from '../models/incident'

export const incidentSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('register'),
    z.literal('fetch'),
    z.literal('delete'),
  ]),
  z.union([z.literal('incident'), incidentSchema]),
])

export type incidentSubject = z.infer<typeof incidentSubject>
