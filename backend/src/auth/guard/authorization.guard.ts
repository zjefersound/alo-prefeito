import { PrismaService } from '@/database/prisma.service'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { getUserPermissions } from '../authorization/get-user-permissions'
import { authorizationKey } from '../decorators/authorization.decorator'

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

    return can(action, subject)
  }
}
