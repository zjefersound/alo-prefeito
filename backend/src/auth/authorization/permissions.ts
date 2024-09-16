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
    can('get', 'user')

    can('manage', 'category')

    can('delete', 'incident')
    can('fetch', 'incident')
  },
  CITIZEN(_, { can }) {
    can('get', 'user')
    can('update', 'user')

    can('fetch', 'category')

    can('register', 'incident')
    can('fetch', 'incident')
    can('delete', 'incident')
  },
  API(_, { can }) {
    can('get', 'user')
    can('update', 'user')

    can('fetch', 'incident')

    can('register', 'key')
    can('cancel', 'key')
    can('fetch', 'key')
  },
}
