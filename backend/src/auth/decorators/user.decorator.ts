import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { UserPayload } from '../jwt.strategy'

export const User = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user as UserPayload
  },
)
