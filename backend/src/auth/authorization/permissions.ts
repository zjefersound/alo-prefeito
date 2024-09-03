import { AbilityBuilder } from '@casl/ability'
import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  BACKOFFICE(_, { can }) {
    can('manage', 'category')
    can('delete', 'incident')
    can('fetch', 'incident')
  },
  API(_, { can }) {
    can('fetch', 'incident')
  },
  CITIZEN(user, { can }) {
    can('register', 'incident')
    can('fetch', 'category')

    can('delete', 'incident', {
      authorId: { $eq: user.id },
    })

    can('fetch', 'incident', {
      authorId: { $eq: user.id },
    })
  },
}
