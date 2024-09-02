import { defineAbibilityFor } from '.'
import { userSchema } from './models/user'
import { Role } from './roles'

export function getUserPermissions(userId: string, role: Role) {
  const authUser = userSchema.parse({
    id: userId,
    role,
  })

  const ability = defineAbibilityFor(authUser)

  return ability
}
