import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { authorizationKey } from '../decorators/authorization.decorator'
import { getUserPermissions } from '../authorization/get-user-permissions'
import { PrismaService } from '@/database/prisma.service'
import { incidentSchema } from '../authorization/models/incident'

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const metadata = this.reflector.getAllAndOverride(authorizationKey, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!metadata) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const userId = request.user.sub as string

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return false
    }

    const { role } = user
    const { action, subject } = metadata

    const { can } = getUserPermissions(userId, role)

    if (role === 'CITIZEN' && subject === 'incident' && action === 'delete') {
      const { incidentId } = request.params

      const incident = await this.prisma.incident.findUnique({
        where: {
          id: incidentId,
        },
      })

      if (!incident) {
        return false
      }

      const schema = incidentSchema.parse(incident)

      return can(action, schema)
    }

    return can(action, subject)
  }
}
