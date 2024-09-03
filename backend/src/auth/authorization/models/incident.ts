import { z } from 'zod'

export const incidentSchema = z.object({
  __typename: z.literal('incident').default('incident'),
  id: z.string(),
  authorId: z.string(),
})

export type incident = z.infer<typeof incidentSchema>
